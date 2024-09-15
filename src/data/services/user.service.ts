import database from "@config/database";
import { UpdateProfileDTO } from "@data/dtos/user/update_profile.dto";
import { Service } from "typedi";

@Service()
export class UserService {
  private user = database.instance.user;

  findUser(email: string) {
    return this.user.findUnique({
      where: { email },
    });
  }

  findUserWithId(user_id: string) {
    return this.user.findUnique({
      where: {
        id: user_id
      }
    })
  }

  updateUser(user_id: string, data: UpdateProfileDTO) {
    return this.user.update({
      where: {
        id: user_id,
        email: data.email,
      },
      data: {
        name: data.name,
      },
    });
  }
}
