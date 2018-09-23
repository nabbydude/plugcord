import * as Discord from "discord.js";
import { Param } from "./param";
import { ParamPayloads } from "./util-types";

export interface Command<T extends Param[] = Param[]> {
  name: string;
  command: string;
  alts: string[];
  desc: string;
  params: T;
  run(message: Discord.Message, params: ParamPayloads<T>): void;
}
