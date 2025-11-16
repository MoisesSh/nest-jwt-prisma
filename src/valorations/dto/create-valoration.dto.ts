import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateValorationDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number
    @IsNumber()
    @IsNotEmpty()
    artist_id: number
    @IsString()
    @IsOptional()
    comments: string
    @IsNumber()
    @IsNotEmpty()
    like: number
}
