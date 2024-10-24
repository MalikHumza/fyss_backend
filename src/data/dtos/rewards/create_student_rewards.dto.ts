import { REWARD_KEYS, REWARD_TYPES } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class CreateStudentRewardsDTO {
  @IsString()
  @IsNotEmpty()
  readonly student_email: string;

  @IsEnum(REWARD_TYPES)
  @IsNotEmpty()
  readonly type: REWARD_TYPES;

  @IsEnum(REWARD_KEYS)
  @IsNotEmpty()
  readonly reward_key: REWARD_KEYS;

  @IsString()
  @IsNotEmpty()
  readonly reason: string;

  @IsString()
  @IsNotEmpty()
  readonly reflection: string;

  @IsString()
  @IsNotEmpty()
  readonly notes: string;
}
