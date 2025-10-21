import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesPipe implements PipeTransform {
  transform(value: CreateRoleDto, metadata: ArgumentMetadata) {
    if (typeof value.name_role != 'string') {
      return false;
    }
    return value;
  }
}
