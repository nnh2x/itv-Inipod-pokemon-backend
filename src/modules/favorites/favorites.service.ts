import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateOutput } from 'src/common/page/pagination.page';
import { QueryPaginationDto } from 'src/common/page/query-pagination.page';
import { HttpErrorResponse } from 'src/common/utils/httpErrorResponse';
import { FavoritesDto } from 'src/dto/favorites.dto';
import { PokemonEntity } from 'src/entity/pokemon.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Favorite } from 'src/entity/userFavorite.entity';
import { AuthPayload } from 'src/interfaces/auth.interface';
import { Pokemon } from 'src/interfaces/pokemon.interface';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(PokemonEntity)
    private pokemonRepository: Repository<PokemonEntity>,
  ) {}

  async getInfo(req: Request): Promise<any> {
    const user = req['user'] as any;
    return user;
  }

  async markAsFavorite(body: FavoritesDto, req: Request) {
    const loginBy = (await this.getInfo(req)) as AuthPayload;
    const user = await this.userRepository.findOne({
      where: { id: loginBy.id },
    });

    const pokemon = await this.pokemonRepository.findOne({
      where: { id: body.pokemonId },
    });

    if (!user) {
      throw new HttpErrorResponse(
        'User  not found',
        0,
        HttpStatus.NOT_FOUND,
        '',
      );
    }

    if (!pokemon) {
      throw new HttpErrorResponse(
        'User or Pokémon not found',
        0,
        HttpStatus.NOT_FOUND,
        '',
      );
    }

    const existingFavorite = await this.favoriteRepository.findOne({
      where: {
        user: { id: loginBy.id },
        pokemon: { id: body.pokemonId },
      },
    });

    if (existingFavorite) {
      return existingFavorite;
    }
    const favorite = this.favoriteRepository.create({ user, pokemon });
    return this.favoriteRepository.save(favorite);
  }

  unmaskAsFavorite(id: number) {
    return this.favoriteRepository.delete(id);
  }

  async getUserFavorites(req: Request, query?: QueryPaginationDto) {
    const loginBy = (await this.getInfo(req)) as AuthPayload;
    const page = Number(query?.page || 1);
    const size = Number(query?.size || 10);
    const [pokemon, total] = await this.favoriteRepository
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.pokemon', 'pokemon')
      .where('favorite.user_id = :userId', { userId: loginBy.id })
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();

    const mapData = pokemon.map((data) => {
      return {
        ...data.pokemon,
      } as Pokemon;
    });
    const paginateOutput: PaginateOutput<any> = {
      data: mapData,
      page: {
        total,
        lastPage: Math.ceil(total / size),
        currentPage: page,
        totalPerPage: size,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < Math.ceil(total / size) ? page + 1 : null,
      },
    };

    return paginateOutput;
  }
}
