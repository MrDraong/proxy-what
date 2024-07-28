import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GamesModule } from './games/games.module';
import { GlobalHttpModule } from './global-http/global-http.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GamesModule,
    GlobalHttpModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './db/data.sqlite3',
      autoLoadModels: true,
      synchronize: true,
    }),
    TokenModule,
  ],
  providers: [],
})
export class AppModule {}
