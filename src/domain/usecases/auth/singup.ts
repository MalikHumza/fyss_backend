import { SignUpDTO } from "@data/dtos/auth/signup.dto";
import { HttpResponse } from "@data/res/http_response";
import { AuthService } from "@data/services/auth.service";
import { UserService } from "@data/services/user.service";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class SignUpUseCase {
  @Inject()
  private authService: AuthService;
  @Inject()
  private userService: UserService;

  public async call(data: SignUpDTO) {
    const user = await this.userService.findUser(data.email);
    if (!user) {
      const result = await this.authService.createUser(data);
      return new HttpResponse(result, false);
    }
    throw new HttpError(400, "User with this email already exist!");
  }
}