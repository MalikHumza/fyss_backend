import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class CreatePropertyDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly location: string;

  @IsNumber()
  @IsNotEmpty()
  readonly occupancy: number;

  @IsString()
  @IsOptional()
  readonly image?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}
