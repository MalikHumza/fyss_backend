import { CreateRoomCheckDTO } from "@data/dtos/roomChecks/create_room_check.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { RoomCheckService } from "@data/services/room_check.service";
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
    const result = await this.roomCheckService.createRoomCheckByStudentId(
      student_id,
      staff_id,
      data,
    );
    return new HttpResponse(result, false);
  }
}
