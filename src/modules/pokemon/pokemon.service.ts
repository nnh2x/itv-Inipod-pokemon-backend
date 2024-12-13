import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { InjectRepository } from '@nestjs/typeorm';
import { PokemonEntity } from 'src/entity/pokemon.entity';
import { Repository } from 'typeorm';
import { AuthPayload } from 'src/interfaces/auth.interface';
@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonEntity)
    private pokemonRepository: Repository<PokemonEntity>,
  ) {}

  async parseCsv(req: Request, filePath: string): Promise<void> {
    const results: PokemonEntity[] = [];
    const userInToken = (await req['user']) as AuthPayload;

    console.log(req.headers['user']);
    return;
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
          createdAt: userInToken.id,
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
}
