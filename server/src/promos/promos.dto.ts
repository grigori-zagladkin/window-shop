import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsString } from 'class-validator';
import { SHOULD_BE_BASE64, SHOULD_BE_STRING } from '../common/constants';

export default class PromosDto {
  @ApiProperty({ type: String, example: 'Скидка -80%' })
  @IsString({ message: SHOULD_BE_STRING })
  title?: string;

  @ApiProperty({ type: String, example: 'Картинка в base64' })
  @IsString({ message: SHOULD_BE_STRING })
  @IsBase64({ message: SHOULD_BE_BASE64 })
  image?: string;

  @ApiProperty({ type: String, example: 'Описание акции' })
  @IsString({ message: SHOULD_BE_STRING })
  description?: string;
}
