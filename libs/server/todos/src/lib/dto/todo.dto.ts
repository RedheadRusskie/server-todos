import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class ToDoDto {
  @IsUUID()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  body!: string;

  @IsBoolean()
  complete!: boolean;
}
