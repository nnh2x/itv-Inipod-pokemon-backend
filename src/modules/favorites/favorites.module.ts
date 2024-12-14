import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { UserEntity } from 'src/entity/user.entity';
import { Favorite } from 'src/entity/userFavorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonEntity } from 'src/entity/pokemon.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
@Module({
  imports: [TypeOrmModule.forFeature([PokemonEntity, UserEntity, Favorite])],
  controllers: [FavoritesController],
  providers: [FavoritesService, JwtService, AuthService],
})
export class FavoritesModule {}
