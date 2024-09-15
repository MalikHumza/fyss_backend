import { UpdateProfileDTO } from "@data/dtos/user/update_profile.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { UserService } from "@data/services/user.service";
import { Inject, Service } from "typedi";

@Service()
export class UpdateProfileUseCase {
  @Inject()
  private userService: UserService;

  public async call(req: RequestWithUser, data: UpdateProfileDTO) {
    const user_id = req.user.id;
    const user = await this.userService.updateUser(user_id, data);
    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    };
    return new HttpResponse(response, false);
  }
}
