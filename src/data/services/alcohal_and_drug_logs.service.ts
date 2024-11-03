import database from "@config/database";
import { Service } from "typedi";

@Service()
export class AlcohalAndDrugLogsService {
  public alcohal = database.instance.alcohalAndDrugsLogIncident;

  getAlcohalAndDrugLogsIncidentsByProperty(property_id: string) {
    return this.alcohal.findMany({
      where: {
        property_id,
      },
    });
  }
}
