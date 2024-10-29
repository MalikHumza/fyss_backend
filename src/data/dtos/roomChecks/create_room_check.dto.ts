import { ROOM_CHECK_FEEDBACK } from "@prisma/client";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class CreateRoomCheckDTO {
  @IsString()
  @IsNotEmpty()
  readonly purpose: string;

  @IsString()
  @IsNotEmpty()
  readonly observation: string;

  @IsString()
  @IsNotEmpty()
  readonly thoughts_and_feelings: string;

  @IsString()
  @IsNotEmpty()
  readonly maintenance_issues: string;

  @IsArray()
  @IsNotEmpty()
  readonly feedback: ROOM_CHECK_FEEDBACK[];
}
