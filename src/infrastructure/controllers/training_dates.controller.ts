import { CreateTrainingDatesDTO } from "@data/dtos/trainingDates/create_training_dates.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { CreateTrainingRecordsByPropertyUseCase } from "@domain/usecases/training/create_training_records_by_property";
import { GetAllTrainingDatesByPropertyIdUseCase } from "@domain/usecases/training/get_all_training_records_by_property_id";
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

@JsonController("/training")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class TrainingDatesController {
  private getAllTrainingDatesByPropertyIdUseCase = Container.get(
    GetAllTrainingDatesByPropertyIdUseCase,
  );
  private createTrainingRecordsByPropertyUseCase = Container.get(
    CreateTrainingRecordsByPropertyUseCase,
  );

  @Get("/:property_id")
  @HttpCode(200)
  getAllTrainingRecordsByPropertyId(
    @Req() req: RequestWithUser,
    property_id: string,
  ) {
    return this.getAllTrainingDatesByPropertyIdUseCase.call(req, property_id);
  }

  @Post("/create/:property_id/:staff_id")
  @UseBefore(ValidationMiddleware(CreateTrainingDatesDTO))
  @HttpCode(201)
  createTrainingRecordsForProperty(
    @Req() req: RequestWithUser,
    @Param("property_id") property_id: string,
    @Param("staff_id") staff_id: string,
    @Body() data: CreateTrainingDatesDTO,
  ) {
    return this.createTrainingRecordsByPropertyUseCase.call(
      req,
      property_id,
      staff_id,
      data,
    );
  }
}
