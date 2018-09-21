import { ParamResult } from "./param-result";

export interface Param<R = unknown> {
  print(): string;
  parse(str: string, index: number): ParamResult<R>;
}
