import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetSavingsByStudentIdUseCase } from "@domain/usecases/savings/get_savings_by_student_id";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import {
  Authorized,
  Get,
  HttpCode,
  JsonController,
  Req,
  UseBefore,
} from "routing-controllers";
import Container from "typedi";

@JsonController("/savings")
@Authorized()
@UseBefore(CheckTokenExpiry)
export class SavingsController {
  private getSavingsByStudentIdUseCase = Container.get(
    GetSavingsByStudentIdUseCase,
  );

  @Get("/")
  @HttpCode(200)
  getSavingsByStudentId(@Req() req: RequestWithUser) {
    return this.getSavingsByStudentIdUseCase.call(req);
  }
}
