import * as Discord from "discord.js";
import { ParamResult } from "./param-result";

export interface Param<R = unknown> {
  print(): string;
  parse(message: Discord.Message, index: number): ParamResult<R>;
}
