import { CreateActionPlanForStudentDTO } from "@data/dtos/actionPlan/create_action_plan_student.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { CreateActionPlanForStudentUseCase } from "@domain/usecases/actionPlan/create_action_plan_for_student";
import { GetActionPlanByStudentIdUseCase } from "@domain/usecases/actionPlan/get_action_plan_by_student_id";
import { GetPSPScheduleUseCase } from "@domain/usecases/actionPlan/psp_schedule";
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

@JsonController("/action")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class ActionsPlanController {
  private getActionPlanByStudentIdUseCase = Container.get(
    GetActionPlanByStudentIdUseCase,
  );
  private getPSPScheduleUseCase = Container.get(GetPSPScheduleUseCase);
  private createActionPlanForStudentUseCase = Container.get(
    CreateActionPlanForStudentUseCase,
  );

  @Get("/student")
  @HttpCode(200)
  getActionPlanByStudentId(@Req() req: RequestWithUser) {
    return this.getActionPlanByStudentIdUseCase.call(req);
  }

  @Get("/student/psp")
  @HttpCode(200)
  getStudentPSPSchedule(
    @Req() req: RequestWithUser,
    @QueryParam("from_date", { required: true }) from_date: number,
    @QueryParam("to_date", { required: true }) to_date: number,
  ) {
    return this.getPSPScheduleUseCase.call(req, from_date, to_date);
  }

  @Post("/:student_id")
  @UseBefore(ValidationMiddleware(CreateActionPlanForStudentDTO))
  @HttpCode(201)
  createActionPlanForStudent(
    @Req() req: RequestWithUser,
    @Param("student_id") student_id: string,
    @Body() data: CreateActionPlanForStudentDTO,
  ) {
    return this.createActionPlanForStudentUseCase.call(req, student_id, data);
  }
}
