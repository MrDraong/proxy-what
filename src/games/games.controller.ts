import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { GamesService } from 'src/games/games.service';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  findAll(): string {
    return this.gamesService.findAll();
  }
}
