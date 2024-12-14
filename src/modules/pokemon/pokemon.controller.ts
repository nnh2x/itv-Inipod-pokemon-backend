import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
  Get,
  Query,
  Param,
  ParseIntPipe,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { PokemonEntity } from 'src/entity/pokemon.entity';
import { ApiOkResponse } from '@nestjs/swagger';
import { PaginateOutput } from 'src/common/page/pagination.page';
import { QueryPaginationDto } from 'src/common/page/query-pagination.page';
import { AuthenticationGuard } from '../auth/auth.guard';

@Controller('pokemon')
@UseGuards(AuthenticationGuard)
@UsePipes(ValidationPipe)
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  // csv.controller.ts
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@Request() req, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const filePath = path.join(uploadDir, file.originalname);
    fs.writeFileSync(filePath, file.buffer);
    try {
      const parsedData = await this.pokemonService.uploadPokemon(req, filePath);
      return parsedData;
    } catch (error) {
      console.error('Error parsing CSV:', error);
      throw error;
    }
  }

  @Get('pokemons')
  @ApiOkResponse({ type: PaginateOutput<PokemonEntity> })
  async users(@Query() param: QueryPaginationDto) {
    return await this.pokemonService.getPokemons(param);
  }

  @Get('/:id')
  async getPokemonById(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return await this.pokemonService.getPokemonById(req, id);
  }
}
