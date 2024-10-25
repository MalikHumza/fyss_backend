import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class UpdateProfileDTO {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  readonly dob?: number;

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
