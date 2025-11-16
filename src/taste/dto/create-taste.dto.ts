import { IsNotEmpty, IsString } from "class-validator";

export class CreateTasteDto {
    @IsNotEmpty()
    @IsString()
    taste_name: string
}
