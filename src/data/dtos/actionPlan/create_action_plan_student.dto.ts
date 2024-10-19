import { ACTION_STATUS } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class CreateActionPlanForStudentDTO {
  @IsString()
  @IsNotEmpty()
  readonly key_need: string;

  @IsString()
  @IsNotEmpty()
  readonly action_to_be_completed: string;

  @IsString()
  @IsNotEmpty()
  readonly success_metrics: string;

  @IsNumber()
  @IsNotEmpty()
  readonly due_date: number;

  @IsString()
  @IsNotEmpty()
  readonly assigned_to: string;

  @IsString()
  @IsNotEmpty()
  readonly review: string;

  @IsNumber()
  @IsNotEmpty()
  readonly start_date: number;

  @IsString()
  @IsNotEmpty()
  readonly status: ACTION_STATUS;
}
