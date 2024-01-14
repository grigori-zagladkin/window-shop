import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import AuthDto from './auth.dto';
import { Account } from '@prisma/client';
import {
  UNSUCCESS_AUTH,
  UNSUCCESS_USER_CREATE,
  USER_ALREADY_EXIST,
  USER_NOT_FOUND,
} from '../common/constants';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { TAuthResponse, Tokens } from './auth.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private async createAccount(dto: AuthDto): Promise<boolean> {
    return !!this.prisma.account.create({
      data: {
        ...dto,
      },
    });
  }

  private async getUserByLogin(login: string): Promise<Account> {
    return this.prisma.account.findUnique({
      where: { login },
    });
  }

  private async generatePairTokens(login: string): Promise<Tokens> {
    return {
      accessToken: await this.jwt.signAsync({ login }),
      refreshToken: await this.jwt.signAsync({ login }),
    };
  }

  private async getAuthData(login: string): Promise<TAuthResponse> {
    return {
      ...(await this.generatePairTokens(login)),
      login,
    };
  }

  async registration(dto: AuthDto): Promise<TAuthResponse | null> {
    const { login, password } = dto;
    const candidate = this.getUserByLogin(login);
    if (candidate) {
      throw new ConflictException(USER_ALREADY_EXIST);
    }
    const hashPassword = await hash(password);
    const acc = this.createAccount({
      login,
      password: hashPassword,
    });
    if (acc) {
      return await this.getAuthData(login);
    } else {
      throw new BadRequestException(UNSUCCESS_USER_CREATE);
    }
  }

  async login(dto: AuthDto): Promise<TAuthResponse | null> {
    const { login, password } = dto;
    const acc = await this.getUserByLogin(login);
    if (!acc) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    if (!(await verify(acc.password, password))) {
      throw new BadRequestException(UNSUCCESS_AUTH);
    }
    return await this.getAuthData(login);
  }
}
