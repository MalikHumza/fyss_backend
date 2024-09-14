import { SignUpDTO } from "@data/dtos/auth/signup.dto";
import { HttpResponse } from "@data/res/http_response";
import { AuthService } from "@data/services/auth.service";
import { Inject, Service } from "typedi";

@Service()
export class SignUpUseCase {
    @Inject()
    private authService: AuthService;

    public async call(data: SignUpDTO) {
        const user = await this.authService.createUser(data);
        return new HttpResponse(user, false);
    }
}