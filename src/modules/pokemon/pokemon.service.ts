import { HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { InjectRepository } from '@nestjs/typeorm';
import { PokemonEntity } from 'src/entity/pokemon.entity';
import { Repository } from 'typeorm';
import { PaginateOutput } from 'src/common/page/pagination.page';
import { QueryPaginationDto } from 'src/common/page/query-pagination.page';
import { addLikeFilters } from 'src/common/page/queryOptions.page';
import { HttpErrorResponse } from 'src/common/utils/httpErrorResponse';
import { Favorite } from 'src/entity/userFavorite.entity';
import { AuthPayload } from 'src/interfaces/auth.interface';
@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonEntity)
    private pokemonRepository: Repository<PokemonEntity>,

    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async uploadPokemon(req: Request, filePath: string): Promise<void> {
    const results: PokemonEntity[] = [];
    try {
      await new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => {
            results.push(data);
          })
          .on('end', () => resolve())
          .on('error', (error) => reject(error));
      });

      const pathData = results.map((data) => {
        return {
          ...data,
        };
      });

      if (pathData.length > 1000) {
        const chunkSize = 500;
        for (let i = 0; i < pathData.length; i += chunkSize) {
          const chunk = pathData.slice(i, i + chunkSize);
          const pokemons = this.pokemonRepository.create(chunk);
          await this.pokemonRepository.save(pokemons);
        }
      } else {
        const pokemons = this.pokemonRepository.create(pathData);
        await this.pokemonRepository.save(pokemons);
      }
    } catch (error) {
      console.error('Error while processing CSV:', error);
    }
  }

  async getPokemons(
    query?: QueryPaginationDto,
  ): Promise<PaginateOutput<PokemonEntity>> {
    const page = parseInt(query?.page || '1', 10) || 1;
    const size = parseInt(query?.size || '10', 10) || 10;
    const filters = query?.filters ? JSON.parse(query.filters) : {};
    const keyQueryFilter = filters ? Object.keys(filters) : [];
    const queryBuilder = this.pokemonRepository.createQueryBuilder('pokemon');
    addLikeFilters(queryBuilder, filters, keyQueryFilter, 'pokemon');
    queryBuilder
      .orderBy('pokemon.id', 'ASC')
      .skip((page - 1) * size)
      .take(size);

    const [pokemon, total] = await queryBuilder.getManyAndCount();
    const paginateOutput: PaginateOutput<PokemonEntity> = {
      data: pokemon,
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

  async getInfo(req: Request): Promise<AuthPayload> {
    const user = req['user'] as AuthPayload;
    return user;
  }

  async getPokemonById(req: Request, id: number) {
    const loginBy = (await this.getInfo(req)) as AuthPayload;
    const pokemon = await this.pokemonRepository.findOne({
      where: { id: id },
    });
    const isFavorite = await this.favoriteRepository.findOne({
      where: {
        pokemon: { id: pokemon.id },
        user: { id: loginBy.id },
      },
    });
    const data = {
      ...pokemon,
      isFavorite: !!isFavorite,
    };

    if (!pokemon) {
      throw new HttpErrorResponse('Day !!!', 0, HttpStatus.NOT_FOUND, {});
    }
    throw new HttpErrorResponse(
      'Find success !!!',
      1,
      HttpStatus.CREATED,
      data,
    );
  }
}
