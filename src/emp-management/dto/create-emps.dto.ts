import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmpsDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  department: string;
  @IsString()
  @IsNotEmpty()
  position: string;
}
