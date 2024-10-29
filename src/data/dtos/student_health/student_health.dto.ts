import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class CreateStudentHealthCheckDTO {
  @IsString()
  @IsNotEmpty()
  readonly health_issue: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly appointment: boolean;

  @IsString()
  @IsNotEmpty()
  readonly feedback: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly medication: boolean;

  @IsString()
  @IsNotEmpty()
  readonly name_of_medication: string;

  @IsNumber()
  @IsNotEmpty()
  readonly from_duration: number;

  @IsNumber()
  @IsNotEmpty()
  readonly to_duration: number;

  @IsNumber()
  @IsNotEmpty()
  readonly follow_up_date: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly evidance: boolean;
}
