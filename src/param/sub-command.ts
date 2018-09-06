import { Command } from "../command";
import { ParamResult } from "../param-result";
import { ParamPayloads, ParamsOf } from "../util-types";
import { Param } from "./_";

// tslint:disable-next-line:max-line-length
export class SubCommandParam<T extends Command[]> extends Param<SubCommandPayloads<T>> {
  constructor(
    public commands: T,
  ) {
    super();
  }

  print(): string {
    return `${this.commands.map(c => c.name).join("|")}`;
  }

  // tslint:disable-next-line:max-line-length
  parse(str: string, index: number): ParamResult<SubCommandPayloads<T>> {
    for (const command of this.commands) {
      const res = command.parse(str, index);
      // tslint:disable-next-line:max-line-length
      if (res.success) {
        return {
          success: true,
          end: res.end,
          payload: {
            command,
            params: res.payload
          } as SubCommandPayloads<T>
        };
      }
    }
    return { success: false };
  }
}

interface SubCommandPayload<T extends Command> {
  command: T;
  params: ParamPayloads<ParamsOf<T>>;
}

type DistributeSubCommandPayload<T extends Command> = (
  T extends unknown ? SubCommandPayload<T> : never
);

export type SubCommandPayloads<T extends Command[]> = (
  DistributeSubCommandPayload<T[number]>
);
