import { LoginDTO } from "@data/dtos/auth/login.dto";
import { HttpResponse } from "@data/res/http_response";
import { AuthService } from "@data/services/auth.service";
import { UserService } from "@data/services/user.service";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";
import * as bcrypt from "bcryptjs";
@Service()
export class ForgotPasswordUseCase {
  @Inject()
  private authService: AuthService;
  @Inject()
  private userService: UserService;

  public async call(data: LoginDTO) {
    const user = await this.userService.findUser(data.email);
    if (!user) {
      throw new HttpError(400, "Invalid User");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await this.authService.forgotPassword({
      email: data.email,
      password: hashedPassword,
    });
    return new HttpResponse(true);
  }
}
