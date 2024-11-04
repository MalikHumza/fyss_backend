import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class CreatePettyCashReportDTO {
  @IsString()
  @IsNotEmpty()
  readonly purpose: string;

  @IsString()
  @IsNotEmpty()
  readonly notes: string;

  @IsNumber()
  @IsNotEmpty()
  readonly credit: number;

  @IsNumber()
  @IsNotEmpty()
  readonly deposit: number;
}
