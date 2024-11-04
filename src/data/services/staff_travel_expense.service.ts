import database from "@config/database";
import { CreateStaffTravelExpenseDTO } from "@data/dtos/travelExpense/create_staff_travel_expense.dto";
import { Service } from "typedi";

@Service()
export class StaffTravelExpenseService {
  public travel_expense = database.instance.staffHasTravelExpense;

  getAllTravelExpenseByProperty(property_id: string) {
    return this.travel_expense.findMany({
      where: {
        property_id,
      },
    });
  }

  createStaffTravelExpense(property_id: string, staff_id: string, data: CreateStaffTravelExpenseDTO) {
    return this.travel_expense.create({
      data: {
        property_id,
        staff_id,
        purpose: data.purpose,
        origin: data.origin,
        destination: data.destination,
        expense: data.expense
      }
    })
  }
}
