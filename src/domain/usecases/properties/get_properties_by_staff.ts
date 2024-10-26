import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { PropertiesService } from "@data/services/properties.service";
import { Inject, Service } from "typedi";

@Service()
export class GetPropertiesByStaffUseCase {
    @Inject()
    private propertiesService: PropertiesService;

    public async call(req: RequestWithUser) {
        const staff_id = req.user.id;
        const result = await this.propertiesService.getPropertiesByStaffId(staff_id);
        const response = result.map(i => ({
            id: i.id,
            staff_id: i.staff_id,
            name: i.name,
            image: i.image,
            location: i.location,
            occupancy: i.occupancy,
            description: i.description,
        }));
        return new HttpResponse(response, false);
    }
}