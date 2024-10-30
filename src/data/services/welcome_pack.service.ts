import database from "@config/database";
import { Service } from "typedi";

@Service()
export class WelcomePackService {
  private welcomePack = database.instance.welcomePackInventory;

  getAllWelcomePakStockByPropertyId(staff_id: string, property_id: string) {
    return this.welcomePack.findMany({
      where: {
        property_id,
        properties: {
          staff_id,
        },
      },
    });
  }
}
