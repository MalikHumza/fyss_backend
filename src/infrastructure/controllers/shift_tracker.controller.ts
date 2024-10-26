import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetShiftTrackerByPropertyIdUseCase } from "@domain/usecases/shiftTracker/get_shift_tracker_by_property";
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

@JsonController("/shift-tracker")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class ShiftTrackerController {
  private getShiftTrackerByPropertyIdUseCase = Container.get(
    GetShiftTrackerByPropertyIdUseCase,
  );

  @Get("/:property_id")
  @HttpCode(200)
  getAllShiftRecordsyPropertyId(
    @Req() req: RequestWithUser,
    @Param("property_id") property_id: string,
  ) {
    return this.getShiftTrackerByPropertyIdUseCase.call(req, property_id);
  }
}
