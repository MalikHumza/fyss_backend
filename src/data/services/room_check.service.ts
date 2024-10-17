import database from "@config/database";
import { CreateRoomCheckDTO } from "@data/dtos/roomChecks/create_room_check.dto";
import { Service } from "typedi";

@Service()
export class RoomCheckService {
  private roomcheck = database.instance.roomCheck;

  getRoomCheckByStudentId(student_id: string) {
    return this.roomcheck.findMany({
      where: {
        student_id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  createRoomCheckByStudentId(
    student_id: string,
    staff_id: string,
    data: CreateRoomCheckDTO,
  ) {
    return this.roomcheck.create({
      data: {
        student_id,
        staff_id,
        ...data,
      },
    });
  }
}
