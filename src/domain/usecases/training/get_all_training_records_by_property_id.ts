import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { TrainingDateService } from "@data/services/training_dates.service";
import { UserService } from "@data/services/user.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class GetAllTrainingDatesByPropertyIdUseCase {
  @Inject()
  private trainingService: TrainingDateService;
  @Inject()
  private userService: UserService;

  public async call(req: RequestWithUser, property_id: string) {
    const role = req.user.role;
    if (role === Roles.STUDENT) {
      throw new HttpError(400, 'Student not Authorized');
    }

    const result = await this.trainingService.getAllTrainingRecordsByPropertyId(
      property_id,
    );

    const response = await Promise.all(
      result.map(async i => {
        const staff = await this.userService.findUserWithId(i.staff_id);
        return {
          id: i.id,
          staff_id: i.staff_id,
          staff_name: staff.name || '',
          property_id,
          topic: i.topic,
          summary: i.summary,
          notes: i.notes || "",
          from_time: i.from,
          to_time: i.to,
          created_at: DateToMiliSeconds(i.createdAt),
        }
      }),
    );

    return new HttpResponse(response, false);
  }
}
