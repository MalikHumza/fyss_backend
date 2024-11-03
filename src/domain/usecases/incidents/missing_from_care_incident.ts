import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { MissingFromCareService } from "@data/services/missing_from_care.service";
import { UserService } from "@data/services/user.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class GetMissingFromCareIncidentUseCase {
    @Inject()
    private missing_from_care_service: MissingFromCareService;
    @Inject()
    private user_service: UserService;

    public async call(req: RequestWithUser, property_id: string) {
        const role = req.user.role;
        const staff_id = req.user.id
        if (role === Roles.STUDENT) {
            throw new HttpError(400, 'Student not Authorized');
        }
        const student = await this.user_service.findUserWithId(staff_id);
        if (student) {
            throw new HttpError(400, 'User not found');
        }

        const result = await this.missing_from_care_service.getMissingFromCareIncidentByPropertyAndStaff(property_id, staff_id);
        const response = result.map(i => ({
            id: i.id,
            staff_name: student.name || '',
            yp: i.yp,
            time_yp_left_unit: i.unit_left_time,
            last_description: i.last_description,
            contacted_authority: i.contacted_authority,
            created_at: DateToMiliSeconds(i.createdAt)
        }));

        return new HttpResponse(response, false);
    }
}