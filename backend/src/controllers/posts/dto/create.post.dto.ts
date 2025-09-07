import { IsInt, IsNotEmpty, IsString, Length, Min } from "class-validator";

export class CreatePostDto {
  @IsInt()
  @Min(1)
  userId!: number; 

  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 2000)
  description!: string;
}
