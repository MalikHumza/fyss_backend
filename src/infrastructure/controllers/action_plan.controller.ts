import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetActionPlanByStudentIdUseCase } from "@domain/usecases/actionPlan/get_action_plan_by_student_id";
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

@JsonController("/action")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class ActionsPlanController {
  private getActionPlanByStudentIdUseCase = Container.get(
    GetActionPlanByStudentIdUseCase,
  );

  @Get("/student")
  @HttpCode(200)
  getActionPlanByStudentId(@Req() req: RequestWithUser) {
    return this.getActionPlanByStudentIdUseCase.call(req);
  }
}
