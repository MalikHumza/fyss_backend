import { CreateSavingLogsDTO } from "@data/dtos/savingsLogs/create_savings.dto";
import { SAVING_TYPES } from "@data/enums/saving_types";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { CreateSavingForStudentsUseCase } from "@domain/usecases/savings/create_savings_for_student";
import { GetSavingsByStudentIdUseCase } from "@domain/usecases/savings/get_savings_by_student_id";
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
  QueryParam,
  Req,
  UseBefore,
} from "routing-controllers";
import Container from "typedi";

@JsonController("/savings")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class SavingsController {
  private getSavingsByStudentIdUseCase = Container.get(
    GetSavingsByStudentIdUseCase,
  );
  private createSavingForStudentsUseCase = Container.get(
    CreateSavingForStudentsUseCase,
  );
  @Get("/student")
  @HttpCode(200)
  getSavingsByStudentId(@Req() req: RequestWithUser) {
    return this.getSavingsByStudentIdUseCase.call(req);
  }

  @Post("/create/:student_id")
  @UseBefore(ValidationMiddleware(CreateSavingLogsDTO))
  @HttpCode(201)
  createSavingsForStudents(
    @Req() req: RequestWithUser,
    @Param("student_id") id: string,
    @QueryParam("type", { required: true }) type: string,
    @Body() data: CreateSavingLogsDTO,
  ) {
    const _type = SAVING_TYPES[type];
    return this.createSavingForStudentsUseCase.call(req, id, _type, data);
  }
}
