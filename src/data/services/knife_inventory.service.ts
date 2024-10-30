import database from "@config/database";
import { Service } from "typedi";

@Service()
export class KnifeInventoryService {
  private knife = database.instance.knifeInventory;

  getAllKnifeStocksByPropertyId(staff_id: string, property_id: string) {
    return this.knife.findMany({
      where: {
        property_id,
        properties: {
          staff_id,
        },
      },
    });
  }
}
