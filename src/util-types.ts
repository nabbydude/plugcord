import { Command } from "./command";
import { Param } from "./param/_";

export type ParamPayload<T> = (
  T extends Param<infer R> ? R : never
);

export type ParamPayloads<T extends Param[]> = {
  [P in keyof T]: ParamPayload<T[P]>;
};

export type ParamsOf<T extends Command> = (
  T extends Command<infer P> ? P : never
);
