import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class updateInfoDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
