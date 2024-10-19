import database from "@config/database";
import { CreateSavingLogsDTO } from "@data/dtos/savingsLogs/create_savings.dto";
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

  createSavingsForStudent(
    student_id: string,
    staff_id: string,
    data: CreateSavingLogsDTO,
  ) {
    return this.savings.create({
      data: {
        student_id,
        staff_id,
        ...data,
      },
    });
  }
}
