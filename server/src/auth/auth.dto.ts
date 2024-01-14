import { IsHash, IsString } from 'class-validator';

export default class AuthDto {
  @IsString()
  login: string;
  @IsString()
  @IsHash('')
  password: string;
}
