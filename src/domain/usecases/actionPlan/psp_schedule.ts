import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { ActionPlanService } from "@data/services/action_plan.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Inject, Service } from "typedi";

@Service()
export class GetPSPScheduleUseCase {
    @Inject()
    private action_plan_service: ActionPlanService;

    public async call(req: RequestWithUser, from_date?: number, to_date?: number) {
        const student_email = req.user.email;
        const student_id = req.user.id;
        const tasks = await this.action_plan_service.getActionPlanByStudentId(student_id, student_email);
        const filtered_tasks = tasks.filter(i => {
            const createdAt = DateToMiliSeconds(i.createdAt);
            return createdAt >= from_date && createdAt <= to_date;
        });

        const groupedTasks = this.groupTasksByDayAndHour(filtered_tasks);
        return new HttpResponse(groupedTasks, false);
    }

    private groupTasksByDayAndHour(tasks: any[]) {
        const timeSlots = Array.from({ length: 12 }, (_, i) => i + 9);
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        const schedule = daysOfWeek.reduce((acc, day) => {
            acc[day] = timeSlots.reduce((timeAcc, timeSlot) => {
                timeAcc[timeSlot] = null;
                return timeAcc;
            }, {});
            return acc;
        }, {});

        const sortedTasks = tasks.sort((a, b) => a.createdAt - b.createdAt);

        sortedTasks.forEach(task => {
            const dayOfWeek = task.createdAt.toLocaleString('en-US', { weekday: 'long' });
            const hour = task.createdAt.getHours();

            if (hour >= 9 && hour <= 20 && schedule[dayOfWeek][hour] === null) {
                schedule[dayOfWeek][hour] = {
                    id: task.id,
                    status: task.status || null,
                };
            }
        });

        return schedule;
    }



}