import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  @Length(3, 50)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(3, 20)
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
