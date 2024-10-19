import database from "@config/database";
import { UpdateProfileDTO } from "@data/dtos/user/update_profile.dto";
import { Roles } from "@prisma/client";
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
        id: user_id,
      },
    });
  }

  findUserWithIdAndRole(user_id: string, role: Roles) {
    return this.user.findUnique({
      where: {
        id: user_id,
        role,
      },
    });
  }

  updateUser(user_id: string, email: string, data: UpdateProfileDTO) {
    return this.user.update({
      where: {
        id: user_id,
        email: email,
      },
      data: {
        name: data.name ?? null,
        dob: data.dob ?? null,
        phone_number: data.phone_number ?? null,
        gender: data.gender ?? null,
        image: data.image ?? null,
      },
    });
  }
}
