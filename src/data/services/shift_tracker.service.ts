import database from "@config/database";
import { CreateShiftRecordsDTO } from "@data/dtos/shiftRecords/create_shift_records.dto";
import { Service } from "typedi";

@Service()
export class ShiftTrackerService {
  private shiftTracker = database.instance.shiftTracker;

  getShiftsRecordByPropertyId(property_id: string, staff_id: string) {
    return this.shiftTracker.findMany({
      where: {
        property_id,
        user_id: staff_id,
      },
    });
  }

  createShiftRecordsByProperty(
    staff_id: string,
    property_id: string,
    data: CreateShiftRecordsDTO,
  ) {
    return this.shiftTracker.create({
      data: {
        user_id: staff_id,
        property_id,
        from: data.from,
        to: data.to,
        shift: data.shift,
        verbal_handover: data.verbal_handover,
      },
    });
  }
}
