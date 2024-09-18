import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { UserService } from "@data/services/user.service";
import { Inject, Service } from "typedi";

@Service()
export class GetProfileUseCase {
  @Inject()
  private userService: UserService;

  public async call(req: RequestWithUser) {
    const user_id = req.user.id;
    const user = await this.userService.findUserWithId(user_id);
    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      dob: user.dob,
      phone_number: user.phone_number,
      gender: user.gender,
      role: user.role,
      image: user.image,
    };
    return new HttpResponse(response, false);
  }
}
