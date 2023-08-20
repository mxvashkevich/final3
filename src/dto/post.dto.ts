import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export const trim = (value: string): string => value.trim();
export class PostDto {
  @Transform(({ value }) => trim(value))
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  imageURL?: string;
}
