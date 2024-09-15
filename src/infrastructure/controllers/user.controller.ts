import { UpdateProfileDTO } from "@data/dtos/user/update_profile.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetProfileUseCase } from "@domain/usecases/user/get_profile";
import { UpdateProfileUseCase } from "@domain/usecases/user/update_profile";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import { ValidationMiddleware } from "@infrastructure/middlewares/validation.middleware";
import {
  Authorized,
  Body,
  Get,
  HttpCode,
  JsonController,
  Put,
  Req,
  UseBefore,
} from "routing-controllers";
import Container from "typedi";

@JsonController("/user")
@Authorized()
@UseBefore(CheckTokenExpiry)
export class UserController {
  private updateProfileUseCase = Container.get(UpdateProfileUseCase);
  private getProfileUseCase = Container.get(GetProfileUseCase);

  @Get("/")
  @HttpCode(200)
  getProfile(@Req() req: RequestWithUser) {
    return this.getProfileUseCase.call(req);
  }

  @Put("/edit-profile")
  @UseBefore(ValidationMiddleware(UpdateProfileDTO))
  @HttpCode(200)
  updateProfile(@Req() req: RequestWithUser, @Body() data: UpdateProfileDTO) {
    return this.updateProfileUseCase.call(req, data);
  }
}
