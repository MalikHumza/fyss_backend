import database from "@config/database";
import { Service } from "typedi";

@Service()
export class StudentHealthService {
  private health = database.instance.health;

  getStudentHealth(student_id: string, student_email: string) {
    return this.health.findMany({
      where: {
        student_id,
        student_email,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }
}
