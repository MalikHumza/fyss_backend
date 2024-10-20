import { QUARTER_MONTHS } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class CreateSupportPlanDTO {
  @IsString()
  @IsNotEmpty()
  readonly student_email: string;

  @IsString()
  @IsNotEmpty()
  readonly strengths: string;

  @IsString()
  @IsNotEmpty()
  readonly area_of_development: string;

  @IsString()
  @IsNotEmpty()
  readonly current_strategy_and_support: string;

  @IsString()
  @IsNotEmpty()
  readonly month: QUARTER_MONTHS;

  @IsNumber()
  @IsNotEmpty()
  readonly year: number;
}
