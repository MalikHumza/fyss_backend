import database from "@config/database";
import { CreateStudentHealthCheckDTO } from "@data/dtos/student_health/student_health.dto";
import { HttpError } from "routing-controllers";
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
    student_email: string,
    data: CreateStudentHealthCheckDTO,
  ) {
    try {
      return this.health.create({
        data: {
          staff_id,
          student_id,
          staff_name,
          student_email,
          health_issue: data.health_issue,
          appointment: data.appointment,
          feedback: data.feedback,
          medication: data.medication,
          name_of_medication: data.name_of_medication,
          from_duration: data.from_duration,
          to_duration: data.to_duration,
          follow_up_date: data.follow_up_date,
          evidence: data.evidance,
        },
      });
    } catch (error) {
      throw new HttpError(400, error.message);
    }
  }
}
