import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetAllTrainingDatesByPropertyIdUseCase } from "@domain/usecases/training/get_all_training_records_by_property_id";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import { Authorized, Get, HttpCode, JsonController, Req, UseBefore } from "routing-controllers";
import Container from "typedi";

@JsonController('/training')
@UseBefore(CheckTokenExpiry)
@Authorized()
export class TrainingDatesController {
    private getAllTrainingDatesByPropertyIdUseCase = Container.get(GetAllTrainingDatesByPropertyIdUseCase);

    @Get('/:property_id')
    @HttpCode(200)
    getAllTrainingRecordsByPropertyId(@Req() req: RequestWithUser, property_id: string) {
        return this.getAllTrainingDatesByPropertyIdUseCase.call(req, property_id);
    }
}