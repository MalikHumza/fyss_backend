import database from "@config/database";
import { Service } from "typedi";

@Service()
export class ShoppingStockService {
  private shopping = database.instance.shoppingStockInventory;

  getAllShoppingStockListByProperty(staff_id: string, property_id: string) {
    return this.shopping.findMany({
      where: {
        property_id,
        property: {
          staff_id,
        },
      },
    });
  }
}
