import { PartialType } from '@nestjs/swagger';
import { CreateTasteDto } from './create-taste.dto';

export class UpdateTasteDto extends PartialType(CreateTasteDto) {}
