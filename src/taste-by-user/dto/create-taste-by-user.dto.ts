import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTasteByUserDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number
    @IsNumber()
    @IsNotEmpty()
    taste_id: number
}
