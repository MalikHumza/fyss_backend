import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { TrainingDateService } from "@data/services/training_dates.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Inject, Service } from "typedi";

@Service()
export class GetAllTrainingDatesByPropertyIdUseCase {
    @Inject()
    private trainingService: TrainingDateService;

    public async call(req: RequestWithUser, property_id: string) {
        const staff_id = req.user.id;
        const staff_name = req.user.name;
        const result = await this.trainingService.getAllTrainingRecordsByPropertyid(property_id, staff_id);
        const response = result.map(i => ({
            id: i.id,
            staff_id,
            staff_name,
            property_id,
            topic: i.topic,
            summary: i.summary,
            notes: i.notes || '',
            from_time: i.from,
            to_time: i.to,
            created_at: DateToMiliSeconds(i.createdAt)
        }));

        return new HttpResponse(response, false);
    }
}