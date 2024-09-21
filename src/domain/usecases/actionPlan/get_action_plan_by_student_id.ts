import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { ActionPlanService } from "@data/services/action_plan.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Inject, Service } from "typedi";

@Service()
export class GetActionPlanByStudentIdUseCase {
    @Inject()
    private actionPlan: ActionPlanService;

    public async call(req: RequestWithUser) {
        const student_id = req.user.id;
        const student_email = req.user.email;
        const action = await this.actionPlan.getActionPlanByStudentId(student_id, student_email);
        const response = action.map(i => ({
            id: i.id,
            staff_name: i.staff_name || '',
            key_need: i.key_need || '',
            action_to_be_completed: i.action_to_be_completed || '',
            success_metrics: i.success_metrics || '',
            due_date: i.due_date,
            assigned_to: i.assigned_to || '',
            review: i.review || '',
            start_date: i.start_date,
            status: i.status || '',
            created_at: DateToMiliSeconds(i.createdAt)
        }));
        return new HttpResponse(response, false);
    }
}