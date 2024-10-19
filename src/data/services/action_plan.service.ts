import database from "@config/database";
import { CreateActionPlanForStudentDTO } from "@data/dtos/actionPlan/create_action_plan_student.dto";
import { Service } from "typedi";

@Service()
export class ActionPlanService {
  private action_plan = database.instance.actionPlan;

  getActionPlanByStudentId(student_id: string, student_email: string) {
    return this.action_plan.findMany({
      where: {
        student_id,
        student_email,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  createActionPlanForStudent(student_id: string, staff_name: string, staff_id: string, student_email: string, data: CreateActionPlanForStudentDTO) {
    return this.action_plan.create({
      data: {
        staff_id,
        staff_name,
        student_id,
        student_email,
        ...data
      }
    })
  }
}
