import { PartialType } from '@nestjs/swagger';
import { CreateTasteByUserDto } from './create-taste-by-user.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTasteByUserDto extends PartialType(CreateTasteByUserDto) {
        @IsNumber()
        @IsNotEmpty()
        user_id: number
        @IsNumber()
        @IsNotEmpty()
        taste_id: number
}
