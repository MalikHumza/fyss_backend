import { CreatePropertyDTO } from "@data/dtos/properties/create_property.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { CreatePropertyUseCase } from "@domain/usecases/properties/create_property";
import { CreateStaffHasPropertyUseCase } from "@domain/usecases/properties/create_staff_has_property";
import { GetAllPropertiesUseCase } from "@domain/usecases/properties/get_all_properties";
import { GetPropertiesByStaffUseCase } from "@domain/usecases/properties/get_properties_by_staff";
import { GetPropertyByIdUseCase } from "@domain/usecases/properties/get_property_by_id";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import {
  Authorized,
  Body,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
  Req,
  UploadedFile,
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
  private createPropertyUseCase = Container.get(CreatePropertyUseCase);
  private getAllPropertiesUseCase = Container.get(GetAllPropertiesUseCase);
  private createStaffHasPropertyUseCase = Container.get(
    CreateStaffHasPropertyUseCase,
  );

  @Post("/create")
  @HttpCode(201)
  createProperty(
    @Req() req: RequestWithUser,
    @Body() data: CreatePropertyDTO,
    @UploadedFile("image") file?: Express.Multer.File,
  ) {
    return this.createPropertyUseCase.call(req, data, file);
  }

  @Get("/staff")
  @HttpCode(200)
  getPropertiesByStaff(@Req() req: RequestWithUser) {
    return this.getPropertiesByStaffUseCase.call(req);
  }

  @Get("/")
  @HttpCode(200)
  getAllProperties(@Req() req: RequestWithUser) {
    return this.getAllPropertiesUseCase.call(req);
  }

  @Get("/:property_id")
  @HttpCode(200)
  getPropertyById(
    @Req() req: RequestWithUser,
    @Param("property_id") property_id: string,
  ) {
    return this.getPropertyByIdUseCase.call(req, property_id);
  }

  @Post("/create/:staff_id/:property_id")
  @HttpCode(201)
  createStaffHasProperty(
    @Req() req: RequestWithUser,
    @Param("staff_id") staff_id: string,
    @Param("property_id") property_id: string,
  ) {
    return this.createStaffHasPropertyUseCase.call(req, staff_id, property_id);
  }
}
