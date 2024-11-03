import database from "@config/database";
import { Service } from "typedi";

@Service()
export class PettyCashBalanceService {
  public petty_cash_balance = database.instance.propertyHasPettyCashBalance;

  getPettyCashBalanceByProperty(property_id: string) {
    return this.petty_cash_balance.findMany({
      where: {
        property_id,
      },
      orderBy: {
        balance: "desc",
      },
    });
  }
}
