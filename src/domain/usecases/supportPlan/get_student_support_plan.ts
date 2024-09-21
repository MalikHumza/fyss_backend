import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { SupportPlanService } from "@data/services/support.service";
import { QUARTER_MONTHS } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class GetStudentSupportPlanUseCase {
  @Inject()
  private supportPlan: SupportPlanService;

  public async call(
    req: RequestWithUser,
    months?: QUARTER_MONTHS,
    year?: number,
  ) {
    const { id, email } = req.user;
    const getPlan = await this.supportPlan.getStudentSupportPlan(
      id,
      email,
      months,
      year,
    );
    if (getPlan) {
      const response = {
        id: getPlan.id,
        student_id: getPlan.student_id,
        student_email: getPlan.student_email,
        months,
        year,
        strenghts: getPlan.strengths || "",
        area_of_development: getPlan.area_of_development || "",
        strategy_and_support: getPlan.current_strategy_and_support || "",
      };
      return new HttpResponse(response, false);
    }
    throw new HttpError(400, "Student support plan not found");
  }
}
