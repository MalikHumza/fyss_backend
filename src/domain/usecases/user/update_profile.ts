import { UpdateProfileDTO } from "@data/dtos/user/update_profile.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { UserService } from "@data/services/user.service";
import { FormValidationMiddleware } from "@infrastructure/middlewares/form.middleware";
import { Inject, Service } from "typedi";

@Service()
export class UpdateProfileUseCase {
  @Inject()
  private userService: UserService;

  public async call(
    req: RequestWithUser,
    data: UpdateProfileDTO,
    file?: Express.Multer.File,
  ) {
    await FormValidationMiddleware(data);
    const user_id = req.user.id;
    const user_email = req.user.email;
    const user = await this.userService.updateUser(user_id, user_email, data);
    const response = {
      id: user.id,
      name: user.name,
      title: user.title ?? null,
      email: user.email,
      dob: user.dob,
      phone_number: user.phone_number,
      gender: user.gender,
      image: user.image,
      role: user.role,
    };
    return new HttpResponse(response, false);
  }
}
