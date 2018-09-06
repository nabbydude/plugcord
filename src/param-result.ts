export type ParamResult<T> = SuccessfulParamResult<T> | FailedParamResult;

interface SuccessfulParamResult<T> {
  success: true;
  end: number;
  payload: T;
}

interface FailedParamResult {
  success: false;
}
