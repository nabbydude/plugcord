import { ParamResult } from "../param-result";

export abstract class Param<R = unknown> {
  abstract print(): string;
  abstract parse(str: string, index: number): ParamResult<R>;
}
