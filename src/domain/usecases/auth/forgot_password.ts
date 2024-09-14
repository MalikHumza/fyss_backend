import { LoginDTO } from "@data/dtos/auth/login.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { AuthService } from "@data/services/auth.service";
import { UserService } from "@data/services/user.service";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";
import * as bcrypt from 'bcryptjs';

@Service()
export class ForgotPasswordUseCase {
    @Inject()
    private authService: AuthService;
    @Inject()
    private userService: UserService;

    public async call(req: RequestWithUser, data: LoginDTO) {
        const user_id = req.user.id;
        const user = await this.userService.findUser(data.email);
        if (!user) {
            throw new HttpError(400, 'Invalid User');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);

        await this.authService.forgetPassword({ email: data.email, passowrd: hashedPassword, user_id: user_id });
        return new HttpResponse(true);

    }
}