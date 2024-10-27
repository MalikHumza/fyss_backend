import { CreateStudentHealthCheckDTO } from "@data/dtos/student_health/student_health.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { StudentHealthService } from "@data/services/student_health.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class CreateStudentHealthCheckUseCase {
  @Inject()
  private student_health_service: StudentHealthService;

  public async call(
    req: RequestWithUser,
    student_id: string,
    data: CreateStudentHealthCheckDTO,
  ) {
    const staff_id = req.user.id;
    const staff_name = req.user.name;
    const role = req.user.role;

    if (role === Roles.STUDENT) {
      throw new HttpError(400, "Not Authorized");
    }

    if (!student_id) {
      throw new HttpError(400, "Student Id cannot be empty");
    }
    const health =
      await this.student_health_service.createHealthMeasureForStudent(
        student_id,
        staff_id,
        staff_name,
        data,
      );
    const response = {
      id: health.id,
      staff_name,
      staff_id,
      student_id,
      student_email: health.student_email,
      health_issue: health.health_issue,
      appointment: health.appointment,
      feedback: health.feedback,
      medication: health.medication,
      name_of_medication: health.name_of_medication,
      course_duaration: `${health.from_duration} - ${health.to_duration}`,
      follow_up_date: health.follow_up_date,
      evidence: health.evidence,
      created_at: DateToMiliSeconds(health.createdAt),
    };

    return new HttpResponse(response, false);
  }
}
