import { Role } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class SignUpDTO {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly role: Role;
}
