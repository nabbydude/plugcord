import { Command } from "./command";
import { Param } from "./param";

export type ParamPayload<T extends Param> = (
  T extends Param<infer R> ? R : never
);

export type ParamPayloads<T extends Param[]> = {
  [P in Extract<keyof T, number>]: ParamPayload<T[P]>;
};

export type ParamsOf<T extends Command> = (
  T extends Command<infer P> ? P : never
);
