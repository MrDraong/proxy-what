import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './token.model';
import { TokenService } from './token.service';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([Token])],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
