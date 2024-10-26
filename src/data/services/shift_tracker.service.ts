import database from "@config/database";
import { Service } from "typedi";

@Service()
export class ShiftTrackerService {
    private shiftTracker = database.instance.shiftTracker;

    getShiftsRecordByPropertyId(property_id: string, staff_id: string) {
        return this.shiftTracker.findMany({
            where: {
                property_id,
                property: {
                    staff_id
                }
            }
        });
    }
}