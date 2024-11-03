import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { PropertiesService } from "@data/services/properties.service";
import { UserService } from "@data/services/user.service";
import { Inject, Service } from "typedi";

@Service()
export class GetStaffDashboardUseCase {
  @Inject()
  private userService: UserService;
  @Inject()
  private propertiesService: PropertiesService;

  public async call(req: RequestWithUser) {
    const { id, name } = req.user;
    const [user, staff_has_property] = await Promise.all([
      this.userService.findUserWithId(id),
      this.propertiesService.getStaffHasProperty(id),
    ]);
    const properties = await this.propertiesService.getPropertiesById(
      staff_has_property.map((i) => i.property_id),
    );
    const response = {
      name,
      title: user.title,
      properties: properties.map((i) => ({
        id: i.id,
        name: i.name,
        description: i.description,
        location: i.location,
        occupancy: i.occupancy,
        image: i.image || "",
      })),
    };
    return new HttpResponse(response, false);
  }
}
