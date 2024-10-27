import { CreateActionPlanForStudentDTO } from "@data/dtos/actionPlan/create_action_plan_student.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { ActionPlanService } from "@data/services/action_plan.service";
import { UserService } from "@data/services/user.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class CreateActionPlanForStudentUseCase {
  @Inject()
  private actionPlanService: ActionPlanService;
  @Inject()
  private userService: UserService;

  public async call(
    req: RequestWithUser,
    student_id: string,
    data: CreateActionPlanForStudentDTO,
  ) {
    const staff_id = req.user.id;
    const staff_name = req.user.name;
    const role = req.user.role;

    if (role === Roles.STUDENT) {
      throw new HttpError(400, "Not Authorized");
    }

    const student = await this.userService.findUserWithIdAndRole(
      student_id,
      Roles.STUDENT,
    );
    if (!student) {
      throw new HttpError(400, "Student does not exist");
    }

    const actionPlan = await this.actionPlanService.createActionPlanForStudent(
      student_id,
      staff_name,
      staff_id,
      student.email,
      data,
    );
    const response = {
      id: actionPlan.id,
      entry_by: staff_name,
      your_key_need: actionPlan.key_need,
      action_to_be_completed: actionPlan.action_to_be_completed,
      success_metrics: actionPlan.success_metrics,
      due_date: actionPlan.due_date,
      assigned_to: actionPlan.assigned_to,
      review: actionPlan.review || "",
      start_date: actionPlan.start_date,
      status: actionPlan.status,
      created_at: DateToMiliSeconds(actionPlan.createdAt),
    };
    return new HttpResponse(response, false);
  }
}
