import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class CreateSavingLogsDTO {
  @IsString()
  @IsOptional()
  readonly depositer_name?: string;

  @IsString()
  @IsOptional()
  readonly withdrawl_name?: string;

  @IsString()
  @IsNotEmpty()
  readonly recieved_by: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;
}
