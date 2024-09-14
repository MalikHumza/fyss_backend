import database from "@config/database";
import { SignUpDTO } from "@data/dtos/auth/signup.dto";
import { Service } from "typedi";
import * as bcrypt from 'bcryptjs';
@Service()
export class AuthService {
    private auth = database.instance.user;
    private session = database.instance.session;

    async createUser(data: SignUpDTO) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.auth.create({
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

    resetPassword(data: { user_id: string, email: string, passowrd: string }) {
        return this.auth.update({
            where: {
                id: data.user_id,
                email: data.email,
            },
            data: {
                hashedPassword: data.passowrd
            }
        })
    }

    forgotPassword(data: { email: string, password: string }) {
        return this.auth.update({
            where: {
                email: data.email,
            },
            data: {
                hashedPassword: data.password
            }
        })
    }
}