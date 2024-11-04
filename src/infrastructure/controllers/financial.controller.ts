import { CreatePettyCashReportDTO } from "@data/dtos/pettyCash/create_petty_cash.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { CreatePettyCashReportUseCase } from "@domain/usecases/financial/create_petty_cash_for_property";
import { GetPettyCashFinancialByPropertyUseCase } from "@domain/usecases/financial/get_petty_cash_report_by_property";
import { GetStaffTravelExpenseUseCase } from "@domain/usecases/financial/get_staff_travel_expense_report_by_property";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import { ValidationMiddleware } from "@infrastructure/middlewares/validation.middleware";
import {
  Authorized,
  Body,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
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
  private createPettyCashReportUseCase = Container.get(
    CreatePettyCashReportUseCase,
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

  @Post('/petty_cash/create/:property_id')
  @UseBefore(ValidationMiddleware(CreatePettyCashReportDTO))
  @HttpCode(201)
  createPettyCashForProperty(@Req() req: RequestWithUser, @Param('property_id') property_id: string, @Body() data: CreatePettyCashReportDTO) {
    return this.createPettyCashReportUseCase.call(req, property_id, data);
  }
}
