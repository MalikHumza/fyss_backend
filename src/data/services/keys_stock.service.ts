import database from "@config/database";
import { Service } from "typedi";

@Service()
export class KeysStockService {
    private keyStock = database.instance.keysInventory;

    getAllKeyStockByPropertyId(staff_id: string, property_id: string) {
        return this.keyStock.findMany({
            where: {
                property_id,
                properties: {
                    staff_id
                }
            }
        })
    }
}