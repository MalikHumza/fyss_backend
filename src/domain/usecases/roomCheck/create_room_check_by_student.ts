import { CreateRoomCheckDTO } from "@data/dtos/roomChecks/create_room_check.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { RoomCheckService } from "@data/services/room_check.service";
import { UserService } from "@data/services/user.service";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class CreateRoomCheckByStudentUseCase {
  @Inject()
  private roomCheckService: RoomCheckService;
  @Inject()
  private userService: UserService;

  public async call(
    req: RequestWithUser,
    student_id: string,
    data: CreateRoomCheckDTO,
  ) {
    const staff_id = req.user.id;
    const staff_name = req.user.name;
    const role = req.user.role;

    if (role === Roles.STUDENT) {
      throw new HttpError(400, "Not Authorized");
    }

    if (!student_id) {
      throw new HttpError(400, "Student Id cannot be empty");
    }

    const student = await this.userService.findUserWithId(student_id);
    if (!student) {
      throw new HttpError(400, "Student does not exist");
    }

    const result = await this.roomCheckService.createRoomCheckByStudentId(
      student_id,
      staff_id,
      staff_name,
      data,
    );
    return new HttpResponse(result, false);
  }
}
