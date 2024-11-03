import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { PropertiesService } from "@data/services/properties.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class CreateStaffHasPropertyUseCase {
  @Inject()
  private property_service: PropertiesService;

  public async call(
    req: RequestWithUser,
    staff_id: string,
    property_id: string,
  ) {
    const role = req.user.role;
    if (role === Roles.STUDENT) {
      throw new HttpError(400, "Student not Authorized");
    }
    const staff_has_property = await this.property_service.addStaffToProperty(
      property_id,
      staff_id,
    );
    const result = {
      id: staff_has_property.id,
      property_id,
      staff_id,
      created_at: DateToMiliSeconds(staff_has_property.createdAt),
    };
    return new HttpResponse(result, false);
  }
}
