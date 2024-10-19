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

  updateStudentSavingsBalance(id: string, student_id: string, balance: number) {
    return this.savings.update({
      data: {
        balance,
      },
      where: {
        id,
        student_id
      }
    })
  }

  createSavingsForStudent(
    student_id: string,
    staff_id: string,
    staff_name: string,
    data: CreateSavingLogsDTO,
  ) {
    return this.savings.create({
      data: {
        student_id,
        staff_id,
        staff_name,
        ...data,
      },
    });
  }
}
