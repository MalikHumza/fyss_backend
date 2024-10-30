import database from "@config/database";
import { Service } from "typedi";

@Service()
export class HygineProductsService {
  private hygineProducts = database.instance.hygineProductsInventory;

  getAllHygineProductsByPropertyId(staff_id: string, property_id: string) {
    return this.hygineProducts.findMany({
      where: {
        property_id,
        properties: {
          staff_id,
        },
      },
    });
  }
}
