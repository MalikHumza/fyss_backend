import { Roles } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class SignUpDTO {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly role: Roles;
}
