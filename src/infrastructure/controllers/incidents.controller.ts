import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetAlcohalAndDrugsIncidentUseCase } from "@domain/usecases/incidents/alochal_and_drugs_incident";
import { GetMissingFromCareIncidentUseCase } from "@domain/usecases/incidents/missing_from_care_incident";
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

@JsonController("/incidents")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class IncidentsController {
  private getAlcohalAndDrugsIncidentUseCase = Container.get(
    GetAlcohalAndDrugsIncidentUseCase,
  );
  private getMissingFromCareIncidentUseCase = Container.get(
    GetMissingFromCareIncidentUseCase,
  );

  @Get("/drugs/:property_id")
  @HttpCode(200)
  getAlcohalAndDrugsIncidentByProperty(
    @Req() req: RequestWithUser,
    @Param("property_id") property_id: string,
  ) {
    return this.getAlcohalAndDrugsIncidentUseCase.call(req, property_id);
  }

  @Get("/missing-care/:property_id")
  @HttpCode(200)
  getMissingFromCareByStaffAndProperty(
    @Req() req: RequestWithUser,
    @Param("property_id") property_id: string,
  ) {
    return this.getMissingFromCareIncidentUseCase.call(req, property_id);
  }
}
