import * as Discord from "discord.js";
import { Command } from "./command";
import { Param } from "./param";
import { ParamResult } from "./param-result";
import { Plugin } from "./plugin";
import { ParamPayloads } from "./util-types";

export class PluginManager {
  plugins: Plugin[] = [];

  handleMessage = (message: Discord.Message) => {
    for (const p of this.plugins) {
      if (!message.content.startsWith(p.commandPrefix)) continue;
      for (const c of p.commands) {
        const res = this.parseCommand(
          c,
          message.content,
          p.commandPrefix.length
        );
        if (!res.success) continue;
        c.run(message, res.payload);
        break;
      }
    }
  }

  constructor(
    public client: Discord.Client
  ) {
    client.on("message", this.handleMessage);
  }

  addPlugin<T extends Plugin>(
    constructor: new (manager: PluginManager) => T,
    commandPrefix?: string
  ): T {
    const plugin = new constructor(this);
    if (commandPrefix) plugin.commandPrefix = commandPrefix;
    this.plugins.push(plugin);
    return plugin;
  }

  parseCommand<T extends Param[] = Param[]>(
    command: Command,
    str: string,
    index: number
  ): ParamResult<ParamPayloads<T>> {
    const invoked = [command.command, ...command.alts].find(
      c => str.substr(index, c.length).toLowerCase() === c
    );
    if (!invoked) return { success: false };
    index += invoked.length;

    // skip whitespace
    const reg = /\s*/y;
    reg.lastIndex = index;
    if (reg.exec(str)) index = reg.lastIndex;

    const payload = [];
    for (const p of command.params) {
      const res = p.parse(str, index);
      if (!res.success) return { success: false };
      payload.push(res.payload);
      index = res.end;
    }

    return { success: true, end: index, payload: payload as ParamPayloads<T> };
  }
}
