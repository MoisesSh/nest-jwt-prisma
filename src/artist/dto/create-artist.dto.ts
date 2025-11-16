import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateArtistDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number
    @IsString()
    @IsNotEmpty()
    artist_name: string
    @IsString()
    @IsOptional()
    biography: string
    @IsString()
    @IsOptional()
    web_site: string
    @IsNumber()
    @IsDecimal()
    cost: number
}