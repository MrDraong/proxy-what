import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class GamesService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    private tokenService: TokenService,
  ) {}

  async findAll(): Promise<string> {
    const activeToken = await this.tokenService.getToken();
    const requestConfig: AxiosRequestConfig = { 
      headers: {
        'Accept': 'application/json',
        'Client-ID': `${this.configService.get<string>('CLIENT_ID')}`,
        'Authorization': `Bearer ${activeToken}`,
        
      },
    };

    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.configService.get<string>('API_BASE_URL')}/games`,
        {},
        requestConfig,
      ),
    );
    console.log(data);
    return data;
  }
}
