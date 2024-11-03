import database from "@config/database";
import { Service } from "typedi";

@Service()
export class MissingFromCareService {
    public missing_from_care = database.instance.missingFromCareIncident;

    getMissingFromCareIncidentByPropertyAndStaff(property_id: string, staff_id: string) {
        return this.missing_from_care.findMany({
            where: {
                property_id,
                properties: {
                    staff_id
                }
            }
        })
    }

}