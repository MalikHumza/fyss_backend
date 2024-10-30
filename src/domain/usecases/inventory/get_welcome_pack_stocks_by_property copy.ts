import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { WelcomePackService } from "@data/services/welcome_pack.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class GetWelcomePackStockUseCase {
  @Inject()
  private welcomePackStock: WelcomePackService;

  public async call(req: RequestWithUser, property_id: string) {
    const staff_id = req.user.id;
    const role = req.user.role;
    if (role === Roles.STUDENT) {
      throw new HttpError(400, "Student not Authorized");
    }
    const result =
      await this.welcomePackStock.getAllWelcomePakStockByPropertyId(
        staff_id,
        property_id,
      );
    const response = result.map((i) => ({
      id: i.id,
      user_id: staff_id,
      item: i.item,
      room: i.room,
      default_amount: i.default_amount,
      quantity: i.quantity,
      created_at: DateToMiliSeconds(i.createdAt),
    }));

    return new HttpResponse(response, false);
  }
}
