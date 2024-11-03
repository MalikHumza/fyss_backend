import { CreateShiftRecordsDTO } from "@data/dtos/shiftRecords/create_shift_records.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { CreateShiftRecordsByPropertyUseCase } from "@domain/usecases/shiftTracker/create_shift_records_by_property";
import { GetShiftTrackerByPropertyIdUseCase } from "@domain/usecases/shiftTracker/get_shift_tracker_by_property";
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

@JsonController("/shift-tracker")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class ShiftTrackerController {
  private getShiftTrackerByPropertyIdUseCase = Container.get(
    GetShiftTrackerByPropertyIdUseCase,
  );
  private createShiftRecordsByPropertyUseCase = Container.get(
    CreateShiftRecordsByPropertyUseCase,
  );

  @Get("/:property_id")
  @HttpCode(200)
  getAllShiftRecordsyPropertyId(
    @Req() req: RequestWithUser,
    @Param("property_id") property_id: string,
  ) {
    return this.getShiftTrackerByPropertyIdUseCase.call(req, property_id);
  }

  @Post("/create/:property_id")
  @UseBefore(ValidationMiddleware(CreateShiftRecordsDTO))
  @HttpCode(201)
  createShiftRecordsByProperty(
    req: RequestWithUser,
    @Param("property_id") property_id: string,
    @Body() data: CreateShiftRecordsDTO,
  ) {
    return this.createShiftRecordsByPropertyUseCase.call(
      req,
      property_id,
      data,
    );
  }
}
