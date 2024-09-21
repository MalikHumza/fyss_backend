import database from "@config/database";
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
}
