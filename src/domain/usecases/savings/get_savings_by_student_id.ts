import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { SavingsService } from "@data/services/savings.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Inject, Service } from "typedi";

@Service()
export class GetSavingsByStudentIdUseCase {
  @Inject()
  private savings: SavingsService;

  public async call(req: RequestWithUser) {
    const student_id = req.user.id;
    const student_email = req.user.email;
    const savings = await this.savings.getSavingsByStudentId(
      student_id,
      student_email,
    );

    const response = {
      total: savings[0].balance ?? 0,
      savings: savings.map((i) => ({
        id: i.id,
        entry_by: i.staff_name || "",
        deposited_name: i.depositer_name || null,
        withdrawl_name: i.withdrawl_name || null,
        recieved_by: i.recieved_by || "",
        amount: i.amount ?? 0,
        balance: i.balance ?? 0,
        created_at: DateToMiliSeconds(i.createdAt),
      })),
    };
    return new HttpResponse(response, false);
  }
}
