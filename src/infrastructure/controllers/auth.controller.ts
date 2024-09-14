import { LoginDTO } from "@data/dtos/auth/login.dto";
import { SignUpDTO } from "@data/dtos/auth/signup.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { ForgotPasswordUseCase } from "@domain/usecases/auth/forgot_password";
import { LoginUseCase } from "@domain/usecases/auth/login";
import { SignUpUseCase } from "@domain/usecases/auth/singup";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import { ValidationMiddleware } from "@infrastructure/middlewares/validation.middleware";
import { HttpCode, Controller, Post, Body, UseBefore, Patch, Req, Authorized } from "routing-controllers";
import Container from "typedi";

@Controller("/auth")
export class AuthController {
    private signUpUseCase = Container.get(SignUpUseCase);
    private loginUseCase = Container.get(LoginUseCase);
    private forgotPasswordUseCase = Container.get(ForgotPasswordUseCase);

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

    @Patch("/forgot-password")
    @Authorized()
    @UseBefore(CheckTokenExpiry)
    @UseBefore(ValidationMiddleware(LoginDTO))
    @HttpCode(201)
    forgotPassword(@Req() req: RequestWithUser, @Body() data: LoginDTO) {
        return this.forgotPasswordUseCase.call(req, data);
    }
}
