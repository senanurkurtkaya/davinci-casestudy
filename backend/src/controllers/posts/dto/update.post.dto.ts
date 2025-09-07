import { IsOptional, IsString, Length } from "class-validator";

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(3, 2000)
  description?: string;
}
