import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { PropertiesService } from "@data/services/properties.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class GetPropertiesByStaffUseCase {
  @Inject()
  private propertiesService: PropertiesService;

  public async call(req: RequestWithUser) {
    const staff_id = req.user.id;
    const role = req.user.role;
    if (role === Roles.STUDENT) {
      throw new HttpError(400, 'Student not Authorized');
    }
    const staff_has_property =
      await this.propertiesService.getStaffHasProperty(staff_id);
    const properties = await this.propertiesService.getPropertiesById(staff_has_property.map(i => i.property_id));
    const response = properties.map((i) => ({
      id: i.id,
      staff_id,
      name: i.name,
      image: i.image || null,
      location: i.location,
      occupancy: i.occupancy,
      description: i.description,
      created_at: DateToMiliSeconds(i.createdAt)
    }));
    return new HttpResponse(response, false);
  }
}
