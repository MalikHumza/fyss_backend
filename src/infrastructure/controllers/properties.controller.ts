import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetPropertiesByStaffUseCase } from "@domain/usecases/properties/get_properties_by_staff";
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

@JsonController("/properties")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class PropertiesController {
  private getPropertiesByStaffUseCase = Container.get(
    GetPropertiesByStaffUseCase,
  );

  @Get("/")
  @HttpCode(200)
  getPropertiesByStaff(@Req() req: RequestWithUser) {
    return this.getPropertiesByStaffUseCase.call(req);
  }
}
