import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetPettyCashFinancialByPropertyUseCase } from "@domain/usecases/financial/get_petty_cash_report_by_property";
import { GetStaffTravelExpenseUseCase } from "@domain/usecases/financial/get_staff_travel_expense_report_by_property";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import {
  Authorized,
  Get,
  HttpCode,
  JsonController,
  Param,
  Req,
  UseBefore,
} from "routing-controllers";
import Container from "typedi";

@JsonController("/financial")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class FinancialController {
  private getPettyCashFinancialByPropertyUseCase = Container.get(
    GetPettyCashFinancialByPropertyUseCase,
  );
  private getStaffTravelExpenseUseCase = Container.get(
    GetStaffTravelExpenseUseCase,
  );

  @Get("/petty_cash/:property_id")
  @HttpCode(200)
  getAllPettyCashReportByProperty(
    @Req() req: RequestWithUser,
    @Param("property_id") property_id: string,
  ) {
    return this.getPettyCashFinancialByPropertyUseCase.call(req, property_id);
  }

  @Get("/travel_expense/:property_id")
  @HttpCode(200)
  getAllTravelExpenseByProperty(
    @Req() req: RequestWithUser,
    @Param("property_id") property_id: string,
  ) {
    return this.getStaffTravelExpenseUseCase.call(req, property_id);
  }
}
