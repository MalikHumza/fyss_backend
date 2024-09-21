import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetRoomCheckByStudentIdUseCase } from "@domain/usecases/roomCheck/get_room_check_by_student_id";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import {
  Authorized,
  Get,
  HttpCode,
  JsonController,
  Req,
  UseBefore,
} from "routing-controllers";
import Container from "typedi";

@JsonController("/room-check")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class RoomCheckController {
  private getRoomCheckByStudentIdUseCase = Container.get(
    GetRoomCheckByStudentIdUseCase,
  );

  @Get("/student")
  @HttpCode(200)
  getRoomCheckByStudentId(@Req() req: RequestWithUser) {
    return this.getRoomCheckByStudentIdUseCase.call(req);
  }
}
