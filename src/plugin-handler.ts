import * as Discord from "discord.js";
import { Plugin } from "./plugin";

export class PluginManager {
  plugins: Plugin[] = [];

  handleMessage = (message: Discord.Message) => {
    for (const p of this.plugins) {
      if (!message.content.startsWith(p.commandPrefix)) continue;
      for (const c of p.commands) {
        const res = c.parse(message.content, p.commandPrefix.length);
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
}
