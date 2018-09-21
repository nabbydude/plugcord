import * as Discord from "discord.js";
import { Param } from "./param";
import { ParamResult } from "./param-result";
import { Plugin } from "./plugin";
import { ParamPayloads } from "./util-types";

// tslint:disable-next-line:max-line-length
export interface Command<T extends Param[] = Param[], P extends Plugin = Plugin> {
  name: string;
  command: string;
  alts: string[];
  desc: string;
  params: T;
  plugin: P;
  run(message: Discord.Message, params: ParamPayloads<T>): void;
}
