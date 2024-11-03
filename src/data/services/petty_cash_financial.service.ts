import database from "@config/database";
import { Service } from "typedi";

@Service()
export class PettyCashFinancialService {
  public petty_cash = database.instance.satffHasPettyCash;

  getAllPettyCashReportByProperty(property_id: string) {
    return this.petty_cash.findMany({
      where: {
        property_id,
      },
    });
  }
}
