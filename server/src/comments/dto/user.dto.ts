import { IsNumber, IsOptional, IsString } from "class-validator";

export class UserDto {
  @IsString()
  @IsOptional()
  readonly email: string;

  @IsNumber()
  @IsOptional()
  readonly id: number;

  @IsString()
  readonly login: string;

  @IsString()
  @IsOptional()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly avatar: string;
}