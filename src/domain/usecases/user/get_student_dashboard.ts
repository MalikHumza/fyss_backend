import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { RewardsService } from "@data/services/rewards.service";
import { RoomCheckService } from "@data/services/room_check.service";
import { SavingsService } from "@data/services/savings.service";
import { StudentHealthService } from "@data/services/student_health.service";
import { SupportPlanService } from "@data/services/support.service";
import { Inject, Service } from "typedi";

@Service()
export class GetStudentDashboardUseCase {
    @Inject()
    private rewardsService: RewardsService;
    @Inject()
    private savingsService: SavingsService;
    @Inject()
    private healthService: StudentHealthService;
    @Inject()
    private roomCheckService: RoomCheckService;
    @Inject()
    private supportPlanService: SupportPlanService;

    public async call(req: RequestWithUser) {
        const { id, email, name } = req.user;
        const [rewards, mySavings, health, roomCheck, strengths] = await Promise.all([
            this.rewardsService.getStudentRewards(id, email),
            this.savingsService.getSavingsByStudentId(id, email),
            this.healthService.getStudentHealth(id, email),
            this.roomCheckService.getRoomCheckByStudentId(id),
            this.supportPlanService.getAllStudentSupportPlans(id, email),
        ]);
        const totalSavings = mySavings.reduce((acc, i) => acc + i.balance, 0);
        const totalPoints = rewards.reduce((acc, i) => acc + i.points, 0);
        let response = {
            id,
            name,
            hosue_points: {
                total_points: totalPoints,
                level: 6, // TODO: Need to get from response json 
                level_points: 0
            },
            savings: {
                total: totalSavings,
            },
            health: {
                health_issue: health[0].health_issue || '',
                consulted: health[0].appointment,
            },
            room_check: {
                status: roomCheck[0].feedback || true
            },
            my_strengths: {
                key_strength: strengths[0].strengths || ''
            }
        };
        return new HttpResponse(response, false);
    }
}