import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}