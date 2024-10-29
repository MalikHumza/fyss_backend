import { CreateSupportPlanDTO } from "@data/dtos/supportPlan/create_support_plan.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { SupportPlanService } from "@data/services/support.service";
import { UserService } from "@data/services/user.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class CreateSupportPlanForStudentUseCase {
  @Inject()
  private supportPlanService: SupportPlanService;
  @Inject()
  private userService: UserService;

  public async call(
    req: RequestWithUser,
    student_id: string,
    data: CreateSupportPlanDTO,
  ) {
    const staff_id = req.user.id;
    const role = req.user.role;

    if (role === Roles.STUDENT) {
      throw new HttpError(400, "Not Authorized");
    }
    if (!student_id) {
      throw new HttpError(400, "Student Id cannot be empty");
    }

    const student = await this.userService.findUserWithId(student_id);
    if (!student) {
      throw new HttpError(400, "Student does not exist");
    }

    const result = await this.supportPlanService.createSupportPlanForStudent(
      staff_id,
      student_id,
      student.email,
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
