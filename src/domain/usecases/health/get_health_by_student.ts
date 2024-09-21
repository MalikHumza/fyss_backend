import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { StudentHealthService } from "@data/services/student_health.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Inject, Service } from "typedi";

@Service()
export class GetStudentHealthCheckUseCase {
    @Inject()
    private studentHealth: StudentHealthService;

    public async call(req: RequestWithUser) {
        const { id, email } = req.user;
        const getHealth = await this.studentHealth.getStudentHealth(id, email);
        const response = getHealth.map(i => ({
            id: i.id,
            staff_name: i.staff_name || '',
            health_issue: i.health_issue || '',
            appointment: i.appointment,
            feedback: i.feedback || '',
            medication: i.medication,
            name_of_medication: i.name_of_medication || '',
            course_duration: (`${i.from_duration} - ${i.to_duration}`),
            follow_up_date: i.follow_up_date,
            evidence: i.evidence,
            created_at: DateToMiliSeconds(i.createdAt),
        }));
        return new HttpResponse(response, false);
    }
} 