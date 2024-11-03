import database from "@config/database";
import { Service } from "typedi";

@Service()
export class StaffTravelExpenseService {
    public travel_expense = database.instance.staffHasTravelExpense;

    getAllTravelExpenseByProperty(property_id: string) {
        return this.travel_expense.findMany({
            where: {
                property_id
            }
        })
    }
}