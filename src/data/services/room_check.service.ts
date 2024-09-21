import database from "@config/database";
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
}
