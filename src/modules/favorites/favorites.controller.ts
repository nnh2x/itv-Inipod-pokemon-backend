import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesDto } from 'src/dto/favorites.dto';
import { AuthenticationGuard } from '../auth/auth.guard';
import { ApiBody } from '@nestjs/swagger';
import { QueryPaginationDto } from 'src/common/page/query-pagination.page';

@Controller('favorites')
@UseGuards(AuthenticationGuard)
@UsePipes(ValidationPipe)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('/favorites')
  @ApiBody({ type: FavoritesDto })
  markAsFavorite(@Body() body: FavoritesDto, @Request() req) {
    return this.favoritesService.markAsFavorite(body, req);
  }

  @Get('/user-favorites')
  getUserFavorites(@Query() param: QueryPaginationDto, @Request() req) {
    return this.favoritesService.getUserFavorites(req, param);
  }
}
