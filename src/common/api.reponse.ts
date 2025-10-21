import { HttpStatus } from '@nestjs/common';

export interface ApiResponse<T> {
  message: string;
  resource?: T;
  status: HttpStatus;
}
