import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class GamesService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    private tokenService: TokenService,
  ) {}

  findAll(): string {
    const headersObject = {
      Accept: 'application/json',
      'Client-ID': `${this.configService.get<string>('CLIENT_ID')}`,
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    };

    firstValueFrom(
      this.httpService.post(
        `${this.configService.get<string>('API_BASE_URL')}/games`,
        { headers: headersObject, body: 'fields age_ratings, name' },
      ),
    ).then((response) => {
      console.log(response.data);
    });
    return '';
  }
}
