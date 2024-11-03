import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { ShiftTrackerService } from "@data/services/shift_tracker.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class GetShiftTrackerByPropertyIdUseCase {
  @Inject()
  private shiftTracker: ShiftTrackerService;

  public async call(req: RequestWithUser, property_id: string) {
    const staff_id = req.user.id;
    const role = req.user.role;
    if (role === Roles.STUDENT) {
      throw new HttpError(400, 'Student not Authorized');
    }
    const staff_name = req.user.name;
    const result = await this.shiftTracker.getShiftsRecordByPropertyId(
      property_id,
      staff_id,
    );
    const response = result.map((i) => ({
      id: i.id,
      staff_id,
      handover_from: i.from,
      handover_to: i.to,
      shift: i.shift,
      verbal_handover: i.verbal_handover,
      recieved_by: staff_name,
      created_at: DateToMiliSeconds(i.createdAt),
    }));
    return new HttpResponse(response, false);
  }
}
