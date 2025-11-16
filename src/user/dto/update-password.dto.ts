import { PartialType } from '@nestjs/swagger';
import { updateInfoDto } from './update-info.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class updatePasswordDto extends PartialType(updateInfoDto) {
    @IsString()
    @IsNotEmpty()
    beforePassword: string;
    @IsString()
    @IsNotEmpty()
    afterPassword: string;
    @IsString()
    @IsNotEmpty()
    confirmAfterPassword: string;
}
