import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.model';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token)
    private tokenModel: typeof Token,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  create(token: string): void {
    this.tokenModel.create({ tokenValue: token });
  }

  findAll(): Promise<Token[]> {
    return this.tokenModel.findAll();
  }

  findOne(id: string): Promise<Token> {
    return this.tokenModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const token = await this.findOne(id);
    await token.destroy();
  }

  async getToken(): Promise<string> {
    let token: string = (await this.findOne('1')).tokenValue;
    if (!token || this.isTokenExpired(token)) {
      token = this.createNewToken();
    }

    return token;
  }

  createNewToken(): string {
    let newToken = '';
    firstValueFrom(
      this.httpService.post(
        `${this.configService.get<string>('TOKEN_BASE_URL')}/token?client_id=${this.configService.get<string>('CLIENT_ID')}&client_secret=${this.configService.get<string>('CLIENT_SECRET')}&grant_type=client_credentials`,
      ),
    ).then((response) => {
      newToken = response.data.access_token;
      this.create(newToken);
    });
    return newToken;
  }

  isTokenExpired(token: string): boolean {
    let isTokenValid = false;
    const headersObject = {
      Authorization: `Bearer ${token}`,
    };
    firstValueFrom(
      this.httpService.get(
        `${this.configService.get<string>('TOKEN_BASE_URL')}/validate`,
        { headers: headersObject },
      ),
    ).then((response) => {
      isTokenValid = response.status == 401 ? false : true;
    });
    return isTokenValid;
  }
}
