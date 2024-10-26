import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetPropertiesByStaffUseCase } from "@domain/usecases/properties/get_properties_by_staff";
import { GetPropertyByIdUseCase } from "@domain/usecases/properties/get_property_by_id";
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

@JsonController("/properties")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class PropertiesController {
  private getPropertiesByStaffUseCase = Container.get(
    GetPropertiesByStaffUseCase,
  );
  private getPropertyByIdUseCase = Container.get(GetPropertyByIdUseCase);

  @Get("/")
  @HttpCode(200)
  getPropertiesByStaff(@Req() req: RequestWithUser) {
    return this.getPropertiesByStaffUseCase.call(req);
  }

  @Get("/:property_id")
  @HttpCode(200)
  getPropertyById(
    @Req() req: RequestWithUser,
    @Param("property_id") property_id: string,
  ) {
    return this.getPropertyByIdUseCase.call(req, property_id);
  }
}
