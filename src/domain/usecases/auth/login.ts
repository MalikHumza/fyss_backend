import { LoginDTO } from "@data/dtos/auth/login.dto";
import { AuthService } from "@data/services/auth.service";
import { UserService } from "@data/services/user.service";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "@config/environment";
import { HttpResponse } from "@data/res/http_response";

@Service()
export class LoginUseCase {
  @Inject()
  private authService: AuthService;
  @Inject()
  private userService: UserService;

  public async call(data: LoginDTO) {
    const user = await this.userService.findUser(data.email);
    if (!user) {
      throw new HttpError(400, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.hashedPassword,
    );
    if (!isPasswordValid) {
      throw new HttpError(400, "Invalid Password");
    }

    let response;

    const sessionToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      JWT_KEY,
      { expiresIn: "1d" },
    );

    const isSession = await this.authService.findTokenByUserId(user.id);
    if (!isSession) {
      const session = await this.authService.loginUser(sessionToken, user.id);
      response = {
        token: session.sessionToken,
        id: user.id,
        name: user.name,
        title: user.title ?? null,
        email: user.email,
        dob: user.dob,
        phone_number: user.phone_number,
        gender: user.gender,
        image: user.image,
        role: user.role,
      };

      return new HttpResponse(response, false);
    }
    const sessionUpdate = await this.authService.updateUserSession(
      isSession.id,
      sessionToken,
    );
    response = {
      token: sessionUpdate.sessionToken,
      id: user.id,
      name: user.name,
      title: user.title ?? null,
      email: user.email,
      dob: user.dob,
      phone_number: user.phone_number,
      gender: user.gender,
      image: user.image,
      role: user.role,
    };
    return new HttpResponse(response, false);
  }
}
