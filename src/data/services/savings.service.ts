import database from "@config/database";
import { Service } from "typedi";

@Service()
export class SavingsService {
  private savings = database.instance.savings;

  getSavingsByStudentId(student_id: string, student_email: string) {
    return this.savings.findMany({
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
