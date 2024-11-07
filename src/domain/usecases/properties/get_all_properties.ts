import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { PropertiesService } from "@data/services/properties.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class GetAllPropertiesUseCase {
  @Inject()
  private propertiesService: PropertiesService;

  public async call(req: RequestWithUser) {
    const role = req.user.role;
    if (role === Roles.STUDENT) {
      throw new HttpError(400, "Student not Authorized");
    }

    const properties =
      await this.propertiesService.getAllProperties();

    const response = properties.map((i) => ({
      id: i.id,
      name: i.name,
      image: i.image || "",
      location: i.location,
      occupancy: i.occupancy,
      description: i.description,
      created_at: DateToMiliSeconds(i.createdAt),
    }));
    return new HttpResponse(response, false);
  }
}
