import database from "@config/database";
import { SignUpDTO } from "@data/dtos/auth/signup.dto";
import { Service } from "typedi";
import * as bcrypt from 'bcryptjs';

@Service()
export class AuthService {
    private user = database.instance.user;
    private session = database.instance.session;

    async createUser(data: SignUpDTO) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.user.create({
            data: {
                email: data.email,
                hashedPassword: hashedPassword,
                role: data.role,
            }
        })
    }

    loginUser(session_token: string, user_id: string) {
        return this.session.create({
            data: {
                sessionToken: session_token,
                userId: user_id,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            }
        }
        )
    }

    async forgetPassword(data: { user_id: string, email: string, passowrd: string }) {
        return this.user.update({
            where: {
                id: data.user_id,
                email: data.email,
            },
            data: {
                hashedPassword: data.passowrd
            }
        })
    }
}