import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpErrorResponse<T> extends HttpException {
  constructor(
    message: string,
    errorCode: string | number,
    status: HttpStatus,
    data: T,
  ) {
    super(
      {
        statusCode: status,
        message: message,
        errorCode: errorCode,
        data: data,
      },
      status,
    );
  }
}

export function createSuccessResponse<T>(
  message: string,
  status: number,
  statusCode: HttpStatus = HttpStatus.OK,
  data: T,
) {
  return {
    message,
    status: status,
    statusCode,
    data,
  };
}

export function createErrorResponse<T>(
  message: string,
  errorCode: string | number,
  statusCode: HttpStatus,
  data?: T,
) {
  throw new HttpErrorResponse<T>(message, errorCode, statusCode, data || null);
}
