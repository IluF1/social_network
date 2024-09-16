import { IsString, IsOptional } from 'class-validator';

export class PostDto {
  @IsString()
  readonly content: string;

  @IsString()
  @IsOptional() 
  readonly title?: string;

  @IsString()
  @IsOptional() 
  readonly image?: string;

  @IsString()
  readonly userLogin: string; 
}
