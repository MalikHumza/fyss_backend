import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { AlcohalAndDrugLogsService } from "@data/services/alcohal_and_drug_logs.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class GetAlcohalAndDrugsIncidentUseCase {
    @Inject()
    private alcohalService: AlcohalAndDrugLogsService;

    public async call(req: RequestWithUser, property_id: string) {
        const role = req.user.role;
        if (role === Roles.STUDENT) {
            throw new HttpError(400, 'Student not Authorized');
        }

        const result = await this.alcohalService.getAlcohalAndDrugLogsIncidentsByProperty(property_id);
        const response = result.map(i => ({
            id: i.id,
            description: i.description,
            location: i.location,
            found_by: i.found_by,
            contatced: i.contacted,
            police_involved: i.police_involved || null,
            action_to_be_taken: i.action_to_be_taken,
            action_taken_by: i.action_taken_by,
            date_of_action: i.date_of_action,
            if_disposed: i.disposed || null,
            witnesses: i.witnesses || [],
            risk_assessment: i.risk_assessment,
            notes: i.notes,
            completion_target: i.completion_target_date,
            completed_by: i.completed_by_date,
            reported_by: i.reported_by,
            created_at: DateToMiliSeconds(i.createdAt)
        }));

        return new HttpResponse(response, false);
    }
}