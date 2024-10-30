import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { ShoppingStockService } from "@data/services/shopping_stock.service";
import { UserService } from "@data/services/user.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class GetShoppingStockListUseCase {
    @Inject()
    private shoppingStockService: ShoppingStockService;
    @Inject()
    private userService: UserService;

    public async call(req: RequestWithUser, property_id: string) {
        const staff_id = req.user.id;
        const role = req.user.role;
        if (role === Roles.STUDENT) {
            throw new HttpError(400, 'Student not Authorized');
        }
        const user = await this.userService.findUserWithId(staff_id);
        if (!user) {
            throw new HttpError(400, 'User not found');
        }

        const result = await this.shoppingStockService.getAllShoppingStockListByProperty(staff_id, property_id);

        const response = result.map(i => ({
            id: i.id,
            staff_id,
            staff_name: user.name,
            product_name: i.name,
            locaton: i.location,
            quantity: i.quantity,
            allocated_to: i.allocated_to,
            date_ordered: i.date_ordered,
            date_recieved: i.date_recieved,
            created_at: DateToMiliSeconds(i.createdAt)
        }));

        return new HttpResponse(response, false);
    }
}