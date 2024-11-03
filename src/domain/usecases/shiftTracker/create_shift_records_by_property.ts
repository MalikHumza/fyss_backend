import { CreateShiftRecordsDTO } from "@data/dtos/shiftRecords/create_shift_records.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { ShiftTrackerService } from "@data/services/shift_tracker.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class CreateShiftRecordsByPropertyUseCase {
  @Inject()
  private shift_tracker_service: ShiftTrackerService;

  public async call(
    req: RequestWithUser,
    property_id: string,
    data: CreateShiftRecordsDTO,
  ) {
    const user_id = req.user.id;
    const role = req.user.role;
    if (role === Roles.STUDENT) {
      throw new HttpError(400, "Student not Authorized");
    }
    const shift = await this.shift_tracker_service.createShiftRecordsByProperty(
      user_id,
      property_id,
      data,
    );
    const response = {
      id: shift.id,
      handover_from: shift.from,
      handover_to: shift.to,
      shift: data.shift,
      verbal_handover: data.verbal_handover,
      created_at: DateToMiliSeconds(shift.createdAt),
    };

    return new HttpResponse(response, false);
  }
}
