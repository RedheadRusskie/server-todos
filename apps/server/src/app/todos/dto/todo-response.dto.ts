import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class TodoResponseDto {
  @IsUUID()
  id!: string;

  @IsUUID()
  user: string;

  @IsString()
  name!: string;

  @IsString()
  body!: string;

  @IsBoolean()
  complete!: boolean;
}
