import { IsString } from 'class-validator';
import { SHOULD_BE_STRING } from '../common/constants';
import { ApiProperty } from '@nestjs/swagger';

export default class AttributeDto {
  @ApiProperty()
  @IsString({ message: SHOULD_BE_STRING })
  title: string;

  @ApiProperty()
  @IsString({ each: true })
  suggestVariants: string[];
}
