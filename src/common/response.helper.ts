import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from './api.reponse';

export function buildResponse<T>(
  message: string,
  status: HttpStatus,
  resource?: T,
): ApiResponse<T> {
  return {
    message,
    resource,
    status,
  };
}
