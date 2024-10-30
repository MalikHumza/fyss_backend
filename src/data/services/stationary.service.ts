import database from "@config/database";
import { Service } from "typedi";

@Service()
export class StationaryService {
  private stationary = database.instance.stationaryInventory;

  getAllStationaryStockByPropertyId(staff_id: string, property_id: string) {
    return this.stationary.findMany({
      where: {
        property_id,
        properties: {
          staff_id,
        },
      },
    });
  }
}
