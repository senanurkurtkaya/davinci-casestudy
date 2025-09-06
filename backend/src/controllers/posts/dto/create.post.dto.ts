import { IsInt, IsNotEmpty, IsString, Length, Min } from "class-validator";

export class CreatePostDto {
  @IsInt()
  @Min(1)
  userId!: number; // hangi kullanıcıya ait

  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 2000)
  body!: string;
}
