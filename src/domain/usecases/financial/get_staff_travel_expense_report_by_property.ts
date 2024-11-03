import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { StaffTravelExpenseService } from "@data/services/staff_travel_expense.service";
import { UserService } from "@data/services/user.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class GetStaffTravelExpenseUseCase {
  @Inject()
  private staff_expense: StaffTravelExpenseService;
  @Inject()
  private user_service: UserService;

  public async call(req: RequestWithUser, property_id: string) {
    const role = req.user.role;
    if (role === Roles.STUDENT) {
      throw new HttpError(400, "Student not Authorized");
    }

    const expense =
      await this.staff_expense.getAllTravelExpenseByProperty(property_id);
    const balance = expense.reduce((acc, i) => acc + i.expense, 0);
    const expenses = await Promise.all(
      expense.map(async (i) => {
        const user = await this.user_service.findUserWithId(i.staff_id);
        return {
          id: i.id,
          purpose: i.purpose,
          from_origin: i.origin,
          to_destination: i.destination,
          expense: i.expense,
          staff_name: user.name || "",
          created_at: DateToMiliSeconds(i.createdAt),
        };
      }),
    );
    const response = {
      total: balance,
      expenses,
    };
    return new HttpResponse(response, false);
  }
}
