import Container from "typedi";
import { LoginDTO } from "@data/dtos/auth/login.dto";
import { SignUpDTO } from "@data/dtos/auth/signup.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { ResetPasswordUseCase } from "@domain/usecases/auth/reset_password";
import { LoginUseCase } from "@domain/usecases/auth/login";
import { SignUpUseCase } from "@domain/usecases/auth/singup";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import { ValidationMiddleware } from "@infrastructure/middlewares/validation.middleware";
import {
  HttpCode,
  Post,
  Body,
  UseBefore,
  Patch,
  Req,
  Authorized,
  Delete,
  JsonController,
} from "routing-controllers";
import { ForgotPasswordUseCase } from "@domain/usecases/auth/forgot_password";
import { ResetPasswordDTO } from "@data/dtos/auth/forgot_password.dto";
import { SignOutUserUseCase } from "@domain/usecases/auth/signout_user";

@JsonController("/auth")
export class AuthController {
  private signUpUseCase = Container.get(SignUpUseCase);
  private loginUseCase = Container.get(LoginUseCase);
  private resetPasswordUseCase = Container.get(ResetPasswordUseCase);
  private forgotPasswordUseCase = Container.get(ForgotPasswordUseCase);
  private signOutUserUseCase = Container.get(SignOutUserUseCase);

  @Post("/signup")
  @UseBefore(ValidationMiddleware(SignUpDTO))
  @HttpCode(201)
  signup(@Body() data: SignUpDTO) {
    return this.signUpUseCase.call(data);
  }

  @Post("/sign-in")
  @UseBefore(ValidationMiddleware(LoginDTO))
  @HttpCode(201)
  login(@Body() data: LoginDTO) {
    return this.loginUseCase.call(data);
  }

  @Patch("/reset-password")
  @UseBefore(CheckTokenExpiry)
  @Authorized()
  @UseBefore(ValidationMiddleware(ResetPasswordDTO))
  @HttpCode(200)
  resetPassword(@Req() req: RequestWithUser, @Body() data: ResetPasswordDTO) {
    return this.resetPasswordUseCase.call(req, data);
  }

  @Patch("/forgot-password")
  @UseBefore(ValidationMiddleware(LoginDTO))
  @HttpCode(200)
  forgotPassword(@Body() data: LoginDTO) {
    return this.forgotPasswordUseCase.call(data);
  }

  @Delete("/signout")
  @UseBefore(CheckTokenExpiry)
  @Authorized()
  @HttpCode(200)
  signOutUser(@Req() req: RequestWithUser) {
    return this.signOutUserUseCase.call(req);
  }
}
