import * as Discord from "discord.js";
import { ParamResult } from "./param-result";
import { Param } from "./param/_";
import { Plugin } from "./plugin";
import { ParamPayloads } from "./util-types";

// tslint:disable-next-line:max-line-length
export abstract class Command<T extends Param[] = Param[], P extends Plugin = Plugin> {
  abstract name: string;
  abstract command: string;
  abstract alts: string[];
  abstract desc: string;
  abstract params: T;

  constructor(
    public plugin: P
  ) {}

  abstract run(message: Discord.Message, params: ParamPayloads<T>): void;

  parse(str: string, index: number): ParamResult<ParamPayloads<T>> {
    const invoked = [this.command, ...this.alts].find(
      c => str.substr(index, c.length).toLowerCase() === c
    );
    if (!invoked) return { success: false };
    index += invoked.length;

    // skip whitespace
    const reg = /\s*/y;
    reg.lastIndex = index;
    if (reg.exec(str)) index = reg.lastIndex;

    const payload = [];
    for (const p of this.params) {
      const res = p.parse(str, index);
      if (!res.success) return { success: false };
      payload.push(res.payload);
      index = res.end;
    }

    return { success: true, end: index, payload: payload as ParamPayloads<T> };
  }
}
