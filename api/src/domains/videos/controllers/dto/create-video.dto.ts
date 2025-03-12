import { IsString, IsUrl } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @IsUrl()
  url: string;
}
