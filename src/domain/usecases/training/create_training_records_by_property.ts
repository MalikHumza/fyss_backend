import { CreateTrainingDatesDTO } from "@data/dtos/trainingDates/create_training_dates.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { TrainingDateService } from "@data/services/training_dates.service";
import { UserService } from "@data/services/user.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class CreateTrainingRecordsByPropertyUseCase {
    @Inject()
    private training_dates: TrainingDateService;
    @Inject()
    private user_Service: UserService;

    public async call(req: RequestWithUser, property_id: string, staff_id: string, data: CreateTrainingDatesDTO) {
        const role = req.user.role;
        if (role === Roles.STUDENT) {
            throw new HttpError(400, 'Student not Authorized');
        }
        const user = await this.user_Service.findUserWithId(staff_id);
        if (user.role === Roles.STUDENT) {
            throw new HttpError(400, 'Student not Authorized');
        }
        const training = await this.training_dates.createTrainingForProperty(property_id, staff_id, data);
        const response = {
            id: training.id,
            from: training.from,
            to: training.to,
            topic: training.topic,
            summary: training.summary,
            notes: training.notes,
            staff_attended: user.name || '',
            created_at: DateToMiliSeconds(training.createdAt),
        }

        return new HttpResponse(response, false);
    }
}