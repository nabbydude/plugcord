import { ParamResult } from "../param-result";
import { Param } from "./_";

export class StringParam extends Param<string> {
  constructor(
    public name: string,
  ) {
    super();
  }

  print(): string {
    return this.name;
  }

  parse(str: string, index: number): ParamResult<string> {
    const reg = /(?:"((?:[^"\\]|\\.)*)"|(\S+))\s*/y;
    reg.lastIndex = index;
    const m = reg.exec(str);
    if (!m) return { success: false };
    // tslint:disable-next-line:no-magic-numbers
    return { success: true, end: reg.lastIndex, payload: m[1] || m[2] };
  }
}
