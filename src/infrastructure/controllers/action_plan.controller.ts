import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetActionPlanByStudentIdUseCase } from "@domain/usecases/actionPlan/get_action_plan_by_student_id";
import { GetPSPScheduleUseCase } from "@domain/usecases/actionPlan/psp_schedule";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import {
  Authorized,
  Get,
  HttpCode,
  JsonController,
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
}
