import { CreateSupportPlanDTO } from "@data/dtos/supportPlan/create_support_plan.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { CreateSupportPlanForStudentUseCase } from "@domain/usecases/supportPlan/create_support_plan_for_student";
import { GetStudentSupportPlanUseCase } from "@domain/usecases/supportPlan/get_student_support_plan";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import { ValidationMiddleware } from "@infrastructure/middlewares/validation.middleware";
import { QUARTER_MONTHS } from "@prisma/client";
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

@JsonController("/support-plan")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class SupportPlanController {
  private getStudentSupportPlanUseCase = Container.get(
    GetStudentSupportPlanUseCase,
  );
  private createSupportPlanForStudentUseCase = Container.get(
    CreateSupportPlanForStudentUseCase,
  );

  @Get("/student")
  @HttpCode(200)
  getStudentSupportPlan(
    @Req() req: RequestWithUser,
    @QueryParam("month", { required: false, type: String })
    month: QUARTER_MONTHS,
    @QueryParam("year", { required: false }) year: number,
  ) {
    return this.getStudentSupportPlanUseCase.call(req, month, year);
  }

  @Post("/create/:student_id")
  @UseBefore(ValidationMiddleware(CreateSupportPlanDTO))
  @HttpCode(201)
  createSupportPlanForStudent(
    @Req() req: RequestWithUser,
    @Param("student_id") student_id: string,
    @Body() data: CreateSupportPlanDTO,
  ) {
    return this.createSupportPlanForStudentUseCase.call(req, student_id, data);
  }
}
