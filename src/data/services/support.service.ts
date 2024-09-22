import database from "@config/database";
import { QUARTER_MONTHS } from "@prisma/client";
import { Service } from "typedi";

@Service()
export class SupportPlanService {
  private support = database.instance.supportPlan;

  getStudentSupportPlan(
    student_id: string,
    student_email: string,
    month?: QUARTER_MONTHS,
    year?: number,
  ) {
    return this.support.findFirst({
      where: {
        student_id,
        student_email,
        month,
        year,
      },
    });
  }

  getAllStudentSupportPlans(student_id: string, student_email: string) {
    return this.support.findMany({
      where: {
        student_id,
        student_email,
      },
    });
  }
}
