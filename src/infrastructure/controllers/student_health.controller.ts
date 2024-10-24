import { CreateStudentHealthCheckDTO } from "@data/dtos/student_health/student_health.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetStudentHealthCheckUseCase } from "@domain/usecases/health/get_health_by_student";
import { CreateStudentHealthCheckUseCase } from "@domain/usecases/student_health/create_student_health_check";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import { ValidationMiddleware } from "@infrastructure/middlewares/validation.middleware";
import {
  Authorized,
  Body,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
  Req,
  UseBefore,
} from "routing-controllers";
import Container from "typedi";

@JsonController("/health")
// @UseBefore(CheckTokenExpiry)
// @Authorized()
export class StudentHealthCheckController {
  private getStudentHealthCheckUseCase = Container.get(
    GetStudentHealthCheckUseCase,
  );
  private createStudentHealthCheckUseCase = Container.get(CreateStudentHealthCheckUseCase);

  @Get("/student")
  @HttpCode(200)
  getStudentHealthCheck(@Req() req: RequestWithUser) {
    return this.getStudentHealthCheckUseCase.call(req);
  }

  @Post("/create/:student_id")
  @UseBefore(ValidationMiddleware(CreateStudentHealthCheckDTO))
  @HttpCode(201)
  createHealthMeasureForStudent(@Req() req: RequestWithUser, @Param('student_id') student_id: string, @Body() data: CreateStudentHealthCheckDTO) {
    return this.createStudentHealthCheckUseCase.call(req, student_id, data);
  }
}
