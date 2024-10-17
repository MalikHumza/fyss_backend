import { CreateRoomCheckDTO } from "@data/dtos/roomChecks/create_room_check.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { CreateRoomCheckByStudentUseCase } from "@domain/usecases/roomCheck/create_room_check_by_student";
import { GetRoomCheckByStudentIdUseCase } from "@domain/usecases/roomCheck/get_room_check_by_student_id";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import { ValidationMiddleware } from "@infrastructure/middlewares/validation.middleware";
import {
  Authorized,
  Body,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
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
  private createRoomCheckByStudentUseCase = Container.get(
    CreateRoomCheckByStudentUseCase,
  );

  @Get("/student")
  @HttpCode(200)
  getRoomCheckByStudentId(@Req() req: RequestWithUser) {
    return this.getRoomCheckByStudentIdUseCase.call(req);
  }

  @Post("/:student_id")
  @HttpCode(201)
  @UseBefore(ValidationMiddleware(CreateRoomCheckDTO))
  createRoomCheckByStudentId(
    @Req() req: RequestWithUser,
    @Param("student_id") student_id: string,
    @Body() data: CreateRoomCheckDTO,
  ) {
    return this.createRoomCheckByStudentUseCase.call(req, student_id, data);
  }
}
