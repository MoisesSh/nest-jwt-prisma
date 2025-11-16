import { PartialType } from '@nestjs/swagger';
import { CreateArtistDto } from './create-artist.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
    @IsString()
    @IsOptional()
    name: string
    @IsString()
    @IsOptional()
    biography: string
    @IsString()
    @IsOptional()
    web_site: string
}
