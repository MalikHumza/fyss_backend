import { HttpResponse } from "@data/res/http_response";
import { AdminService } from "@data/services/admin.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { Inject, Service } from "typedi";

@Service()
export class GetAllStudentsUseCase {
  @Inject()
  private adminService: AdminService;

  public async call() {
    const role = Roles.STUDENT;
    const staffs = await this.adminService.getAllUsersWithRole(role);
    const resposne = staffs.map((i) => ({
      id: i.id,
      name: i.name || "",
      email: i.email || "",
      dob: i.dob,
      phone_number: i.phone_number,
      gender: i.gender || "",
      role: i.role || "",
      image: i.image || "",
      cerated_at: DateToMiliSeconds(i.createdAt),
      updated_at: DateToMiliSeconds(i.updatedAt),
    }));
    return new HttpResponse(resposne, false);
  }
}
