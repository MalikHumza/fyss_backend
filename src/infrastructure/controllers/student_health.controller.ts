import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetStudentHealthCheckUseCase } from "@domain/usecases/health/get_health_by_student";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import {
  Authorized,
  Get,
  HttpCode,
  JsonController,
  Req,
  UseBefore,
} from "routing-controllers";
import Container from "typedi";

@JsonController("/health/student")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class StudentHealthCheckController {
  private getStudentHealthCheckUseCase = Container.get(
    GetStudentHealthCheckUseCase,
  );

  @Get("/")
  @HttpCode(200)
  getStudentHealthCheck(@Req() req: RequestWithUser) {
    return this.getStudentHealthCheckUseCase.call(req);
  }
}
