import database from "@config/database";
import { CreatePettyCashReportDTO } from "@data/dtos/pettyCash/create_petty_cash.dto";
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

  createPettyCashReportForProperty(
    property_id: string,
    staff_id: string,
    data: CreatePettyCashReportDTO,
  ) {
    return this.petty_cash.create({
      data: {
        staff_id,
        property_id,
        purpose: data.purpose,
        notes: data.notes,
        credit: data.credit,
        deposit: data.deposit,
      },
    });
  }
}
