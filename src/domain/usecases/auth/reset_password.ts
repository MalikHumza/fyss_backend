import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { AuthService } from "@data/services/auth.service";
import { UserService } from "@data/services/user.service";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";
import * as bcrypt from 'bcryptjs';
import { ResetPasswordDTO } from "@data/dtos/auth/forgot_password.dto";

@Service()
export class ResetPasswordUseCase {
    @Inject()
    private authService: AuthService;
    @Inject()
    private userService: UserService;

    public async call(req: RequestWithUser, data: ResetPasswordDTO) {
        const user_id = req.user.id;
        const user = await this.userService.findUser(data.email);
        if (!user) {
            throw new HttpError(400, 'Invalid User');
        }
        const isPassowrdValid = await bcrypt.compare(data.old_password, user.hashedPassword);
        if (!isPassowrdValid) {
            throw new HttpError(400, 'Old password do not match');
        }
        const hashedPassword = await bcrypt.hash(data.current_password, 10);

        await this.authService.resetPassword({ email: data.email, passowrd: hashedPassword, user_id: user_id });
        return new HttpResponse(true);

    }
}