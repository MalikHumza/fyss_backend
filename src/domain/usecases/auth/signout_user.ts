import { HttpResponse } from "@data/res/http_response";
import { AuthService } from "@data/services/auth.service";
import { Inject, Service } from "typedi";
import { RequestWithUser } from "@data/interfaces/request.interface";

@Service()
export class SignOutUserUseCase {
  @Inject()
  private authService: AuthService;

  public async call(req: RequestWithUser) {
    const header = req.header("Authorization");
    const sessionToken = header.split("Bearer ")[1];

    await this.authService.signOutUser(sessionToken);

    return new HttpResponse(true);
  }
}
