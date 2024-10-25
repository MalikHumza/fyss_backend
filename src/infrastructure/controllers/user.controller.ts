import { UpdateProfileDTO } from "@data/dtos/user/update_profile.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetProfileUseCase } from "@domain/usecases/user/get_profile";
import { GetStaffDashboardUseCase } from "@domain/usecases/user/get_staff_dashboard";
import { GetStudentDashboardUseCase } from "@domain/usecases/user/get_student_dashboard";
import { UpdateProfileUseCase } from "@domain/usecases/user/update_profile";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import {
  Authorized,
  Body,
  Get,
  HttpCode,
  JsonController,
  Put,
  Req,
  UploadedFile,
  UseBefore,
} from "routing-controllers";
import Container from "typedi";

@JsonController("/user")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class UserController {
  private updateProfileUseCase = Container.get(UpdateProfileUseCase);
  private getProfileUseCase = Container.get(GetProfileUseCase);
  private getStudentDashboardUseCase = Container.get(
    GetStudentDashboardUseCase,
  );
  private getStaffDashboardUseCase = Container.get(GetStaffDashboardUseCase);

  @Get("/")
  @HttpCode(200)
  getProfile(@Req() req: RequestWithUser) {
    return this.getProfileUseCase.call(req);
  }

  @Put("/edit-profile")
  @HttpCode(200)
  updateProfile(
    @Req() req: RequestWithUser,
    @Body() data: UpdateProfileDTO,
    @UploadedFile("image") file?: Express.Multer.File,
  ) {
    return this.updateProfileUseCase.call(req, data, file);
  }

  @Get("/student/dashbaord")
  @HttpCode(200)
  getStudentDashboard(@Req() req: RequestWithUser) {
    return this.getStudentDashboardUseCase.call(req);
  }

  @Get("/staff/dashboard")
  @HttpCode(200)
  getStaffDashboard(@Req() req: RequestWithUser) {
    return this.getStaffDashboardUseCase.call(req);
  }
}
