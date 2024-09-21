import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetStudentSupportPlanUseCase } from "@domain/usecases/supportPlan/get_student_support_plan";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import { QUARTER_MONTHS } from "@prisma/client";
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

@JsonController("/support-plan")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class SupportPlanController {
  private getStudentSupportPlanUseCase = Container.get(
    GetStudentSupportPlanUseCase,
  );

  @Get("/student")
  @HttpCode(200)
  getStudentSupportPlan(
    @Req() req: RequestWithUser,
    @QueryParam("month", { required: true }) months: QUARTER_MONTHS,
    @QueryParam("year", { required: true }) year: number,
  ) {
    return this.getStudentSupportPlanUseCase.call(req, months, year);
  }
}
