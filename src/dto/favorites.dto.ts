import { ApiProperty } from '@nestjs/swagger';

export class FavoritesDto {
  @ApiProperty()
  pokemonId: number;
}
