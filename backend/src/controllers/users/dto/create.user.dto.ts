import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name!: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  username!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
