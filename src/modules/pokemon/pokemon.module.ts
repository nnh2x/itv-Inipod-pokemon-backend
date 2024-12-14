import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { PokemonEntity } from 'src/entity/pokemon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from 'src/entity/user.entity';
import { Favorite } from 'src/entity/userFavorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonEntity, UserEntity, Favorite])],
  controllers: [PokemonController],
  providers: [PokemonService, JwtService, AuthService],
})
export class PokemonModule {}
