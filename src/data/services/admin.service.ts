import database from "@config/database";
import { Roles } from "@prisma/client";
import { Service } from "typedi";

@Service()
export class AdminService {
  private admin = database.instance.user;

  getAllUsersWithRole(role: Roles) {
    return this.admin.findMany({
      where: {
        role,
      },
    });
  }
}
