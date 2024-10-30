import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { KnifeInventoryService } from "@data/services/knife_inventory.service";
import { UserService } from "@data/services/user.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class GetKnifeStockByPropertyUseCase {
  @Inject()
  private knifeInventory: KnifeInventoryService;
  @Inject()
  private userService: UserService;

  public async call(req: RequestWithUser, property_id: string) {
    const staff_id = req.user.id;
    const role = req.user.role;
    if (role === Roles.STUDENT) {
      throw new HttpError(400, "Student not Authorized");
    }

    const user = await this.userService.findUserWithId(staff_id);
    if (!user) {
      throw new HttpError(400, "User not found");
    }

    const result = await this.knifeInventory.getAllKnifeStocksByPropertyId(
      staff_id,
      property_id,
    );
    const response = result.map((i) => ({
      id: i.id,
      user_id: staff_id,
      staff_name: user.name,
      name_of_yp: i.name,
      knife_given: i.type,
      purpose: i.purpose,
      supervised: i.supervised,
      time_out: i.time_out,
      time_returned: i.time_returned,
      notes: i.notes,
      created_at: DateToMiliSeconds(i.createdAt),
    }));

    return new HttpResponse(response, false);
  }
}
