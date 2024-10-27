import { CreateRoomCheckDTO } from "@data/dtos/roomChecks/create_room_check.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { RoomCheckService } from "@data/services/room_check.service";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class CreateRoomCheckByStudentUseCase {
  @Inject()
  private roomCheckService: RoomCheckService;

  public async call(
    req: RequestWithUser,
    student_id: string,
    data: CreateRoomCheckDTO,
  ) {
    const staff_id = req.user.id;
    const role = req.user.role;

    if (role === Roles.STUDENT) {
      throw new HttpError(400, "Not Authorized");
    }

    if (!student_id) {
      throw new HttpError(400, "Student Id cannot be empty");
    }
    const result = await this.roomCheckService.createRoomCheckByStudentId(
      student_id,
      staff_id,
      data,
    );
    return new HttpResponse(result, false);
  }
}
