import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { RoomCheckService } from "@data/services/room_check.service";
import { Inject, Service } from "typedi";

@Service()
export class GetRoomCheckByStudentIdUseCase {
    @Inject()
    private roomCheck: RoomCheckService;

    public async call(req: RequestWithUser) {
        const student_id = req.user.id;
        const roomCheck = await this.roomCheck.getRoomCheckByStudentId(student_id);
        const response = roomCheck.map(i => ({
            id: i.id,
            staff_name: i.staff_name,
            purpose: i.purpose,
            observations: i.observation,
            thoughts_and_feelings: i.thoughts_and_feelings,
            maintenance_issues: i.maintenance_issues,
            created_at: i.createdAt,
        }));
        return new HttpResponse(response, false);
    }
}