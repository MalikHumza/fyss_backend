import { GetAllStaffUseCase } from "@domain/usecases/admin/get_all_staffs";
import { GetAllStudentsUseCase } from "@domain/usecases/admin/get_all_students";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import {
  Authorized,
  Get,
  HttpCode,
  JsonController,
  UseBefore,
} from "routing-controllers";
import Container from "typedi";

@JsonController("/admin")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class AdminController {
  private getAllStudentsUseCase = Container.get(GetAllStudentsUseCase);
  private getAllStaffUseCase = Container.get(GetAllStaffUseCase);

  @Get("/staffs")
  @HttpCode(200)
  getAllStaffs() {
    return this.getAllStaffUseCase.call();
  }

  @Get("/students")
  @HttpCode(200)
  getAllStudents() {
    return this.getAllStudentsUseCase.call();
  }
}
