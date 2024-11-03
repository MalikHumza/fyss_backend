import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { PropertiesService } from "@data/services/properties.service";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class GetPropertyByIdUseCase {
  @Inject()
  private propertiesService: PropertiesService;

  public async call(req: RequestWithUser, property_id: string) {
    const staff_id = req.user.id;
    const role = req.user.role;
    if (role === Roles.STUDENT) {
      throw new HttpError(400, "Student not Authorized");
    }
    const result = await this.propertiesService.getPropertyById(property_id);
    const response = {
      id: result.id,
      staff_id,
      name: result.name,
      image: result.image,
      location: result.location,
      occupancy: result.occupancy,
      description: result.description,
    };
    return new HttpResponse(response, false);
  }
}
