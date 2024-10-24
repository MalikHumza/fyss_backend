import database from "@config/database";
import { CreateStudentHealthCheckDTO } from "@data/dtos/student_health/student_health.dto";
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

  createHealthMeasureForStudent(
    student_id: string,
    staff_id: string,
    staff_name: string,
    data: CreateStudentHealthCheckDTO,
  ) {
    return this.health.create({
      data: {
        staff_id,
        student_id,
        staff_name,
        ...data,
      },
    });
  }
}
