import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class UpdateProfileDTO {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

//   @IsString()
//   @IsNotEmpty()
//   readonly image: string;  //TODO: storge server needed
}
