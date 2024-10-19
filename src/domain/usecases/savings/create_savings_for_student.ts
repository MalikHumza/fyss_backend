import { CreateSavingLogsDTO } from "@data/dtos/savingsLogs/create_savings.dto";
import { SAVING_TYPES } from "@data/enums/saving_types";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { SavingsService } from "@data/services/savings.service";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";
@Service()
export class CreateSavingForStudentsUseCase {
  @Inject()
  private savingService: SavingsService;

  public async call(
    req: RequestWithUser,
    student_id: string,
    type: SAVING_TYPES,
    data: CreateSavingLogsDTO,
  ) {
    const staff_id = "req.user.id";
    const staff_name = "req.user.name";

    switch (type) {
      case SAVING_TYPES.DEPOSITOR:
        const savings = await this.savingService.createSavingsForStudent(
          student_id,
          staff_id,
          staff_name,
          data,
        );

        const saving_data = await this.savingService.getSavingsByStudentId(
          student_id,
          data.student_email,
        );
        if (saving_data.length > 0) {
          const saving_balance = saving_data[0].balance;
          const current_balance = saving_balance + data.amount;
          await this.savingService.updateStudentSavingsBalance(
            savings.id,
            student_id,
            current_balance,
          );
          return new HttpResponse(true, false);
        }
        if (saving_data.length! > 0) {
          throw new HttpError(400, "Savings not found");
        }
        break;
      case SAVING_TYPES.WITHDRAWL:
        const check_savings = await this.savingService.getSavingsByStudentId(
          student_id,
          data.student_email,
        );
        if (check_savings.length > 0) {
          const saving_amount = check_savings[0].balance;
          if (saving_amount < 1) {
            throw new HttpError(400, "Your Balance is Empty!!");
          }
          if (saving_amount! > data.amount) {
            throw new HttpError(400, "You have Insufficient Balance");
          }
          const withdrawl = await this.savingService.createSavingsForStudent(
            student_id,
            staff_id,
            staff_name,
            data,
          );
          const available_balance = saving_amount - data.amount;
          await this.savingService.updateStudentSavingsBalance(
            withdrawl.id,
            student_id,
            available_balance,
          );
          return new HttpResponse(true, false);
        }
        if (check_savings!.length > 0) {
          throw new HttpError(400, "Savings not found");
        }
        break;
      default:
        throw new HttpError(400, "Invalid saving type");
    }
  }
}