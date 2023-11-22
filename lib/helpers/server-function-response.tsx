export class ServerFunctionResponse<T> {
  success: boolean;
  message: string;
  data: T;

  constructor(success: boolean, message: string, data: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

export class SuccessServerFunctionResponse<
  T,
> extends ServerFunctionResponse<T> {
  constructor(message: string, data: T) {
    super(true, message, data);
  }
}

export class ErrorServerFunctionResponse extends ServerFunctionResponse<null> {
  constructor(message: string) {
    super(false, message, null);
  }
}

export class ExceptionServerFunctionResponse extends ErrorServerFunctionResponse {}
