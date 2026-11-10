import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateEmpsDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  department: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  position: string;
}
