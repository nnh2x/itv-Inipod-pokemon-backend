import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  // csv.controller.ts
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@Request() req, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    // Ensure the uploads directory exists
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const filePath = path.join(uploadDir, file.originalname);
    fs.writeFileSync(filePath, file.buffer);
    console.log(`File saved at: ${filePath}`);
    try {
      const parsedData = await this.pokemonService.parseCsv(req, filePath);
      return parsedData;
    } catch (error) {
      console.error('Error parsing CSV:', error);
      throw error;
    }
  }
}
