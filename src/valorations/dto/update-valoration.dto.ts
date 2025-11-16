import { PartialType } from '@nestjs/swagger';
import { CreateValorationDto } from './create-valoration.dto';

export class UpdateValorationDto extends PartialType(CreateValorationDto) {}
