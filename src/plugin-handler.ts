import * as Discord from "discord.js";
import { Plugin, PluginConstructor } from "./plugin";

export class PluginManager {
  plugins: { plugin: Plugin, commandPrefix: string }[] = [];

  handleMessage = (message: Discord.Message) => {
    for (const p of this.plugins) {
      if (!message.content.startsWith(p.commandPrefix)) continue;
      for (const c of p.plugin.commands) {
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

  addPlugin(plugin: PluginConstructor, commandPrefix: string) {
    this.plugins.push({ plugin: new plugin(this), commandPrefix });
  }
}
