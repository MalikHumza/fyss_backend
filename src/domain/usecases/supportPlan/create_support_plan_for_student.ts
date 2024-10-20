import { CreateSupportPlanDTO } from "@data/dtos/supportPlan/create_support_plan.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { SupportPlanService } from "@data/services/support.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Inject, Service } from "typedi";

@Service()
export class CreateSupportPlanForStudentUseCase {
  @Inject()
  private supportPlanService: SupportPlanService;

  public async call(
    req: RequestWithUser,
    student_id: string,
    data: CreateSupportPlanDTO,
  ) {
    const staff_id = req.user.id;
    const result = await this.supportPlanService.createSupportPlanForStudent(
      staff_id,
      student_id,
      data,
    );
    const response = {
      id: result.id,
      staff_id,
      student_id,
      student_email: result.student_email,
      strengths: result.strengths,
      area_of_development: result.area_of_development,
      current_strategy_and_support: result.current_strategy_and_support,
      month: result.month,
      year: result.year,
      created_at: DateToMiliSeconds(result.createdAt),
    };
    return new HttpResponse(response, false);
  }
}
