import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { HygineProductsService } from "@data/services/hygine_products.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class GetHygineProductStocksUseCase {
    @Inject()
    private hygineProductsService: HygineProductsService;;

    public async call(req: RequestWithUser, property_id: string) {
        const staff_id = req.user.id;
        const role = req.user.role;
        if (role === Roles.STUDENT) {
            throw new HttpError(400, 'Student not Authorized')
        }
        const result = await this.hygineProductsService.getAllHygineProductsByPropertyId(staff_id, property_id);
        const response = result.map(i => ({
            id: i.id,
            user_id: staff_id,
            product_name: i.name,
            location: i.location,
            default_amount: i.default_amount,
            quantity: i.quantity,
            created_at: DateToMiliSeconds(i.createdAt)
        }));

        return new HttpResponse(response, false);
    }
}