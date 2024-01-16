import { IsString } from 'class-validator';
import { SHOULD_BE_STRING } from '../common/constants';
import { ApiProperty } from '@nestjs/swagger';

export default class AttributeDto {
  @ApiProperty({ type: String, example: 'Высота' })
  @IsString({ message: SHOULD_BE_STRING })
  title: string;

  @ApiProperty({ type: [String], example: ['1200', '1100', '1300'] })
  @IsString({ each: true })
  suggestVariants: string[];
}
