import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class UpdateProfileDTO {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly dob?: Date;

  @IsString()
  @IsOptional()
  readonly phone_number?: string;

  @IsString()
  @IsOptional()
  readonly gender?: string;

  @IsString()
  @IsOptional()
  readonly image?: string;
}
