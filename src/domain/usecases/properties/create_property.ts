import { CreatePropertyDTO } from "@data/dtos/properties/create_property.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { PropertiesService } from "@data/services/properties.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { FormValidationMiddleware } from "@infrastructure/middlewares/form.middleware";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class CreatePropertyUseCase {
    @Inject()
    private property_service: PropertiesService;

    public async call(req: RequestWithUser, data: CreatePropertyDTO, file?: Express.Multer.File) {
        const role = req.user.role;
        if (role === Roles.STUDENT) {
            throw new HttpError(400, 'Student not Authorized');
        };
        await FormValidationMiddleware(data);
        const property = await this.property_service.createProperty(data);
        const result = {
            id: property.id,
            name: property.name,
            location: property.location,
            occupancy: property.occupancy,
            image: property.image || null,
            description: property.description || '',
            created_at: DateToMiliSeconds(property.createdAt)
        }
        return new HttpResponse(result, false);
    }
}