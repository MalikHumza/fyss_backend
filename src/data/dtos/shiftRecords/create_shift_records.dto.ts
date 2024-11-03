import { SHIFT } from "@prisma/client";
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class CreateShiftRecordsDTO {
  @IsString()
  @IsNotEmpty()
  readonly from: string;

  @IsString()
  @IsNotEmpty()
  readonly to: string;

  @IsEnum(SHIFT)
  @IsNotEmpty()
  readonly shift: SHIFT;

  @IsBoolean()
  @IsNotEmpty()
  readonly verbal_handover: boolean;
}
