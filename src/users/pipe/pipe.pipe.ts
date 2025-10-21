import { CreateUserDto } from './../dto/create-user.dto';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PipePipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    if (value.name && value.lastname && value.email && value.passwordHash) {
      return value;
    } else {
      return false;
    }
  }
}
