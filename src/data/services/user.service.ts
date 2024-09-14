import database from "@config/database";
import { Service } from "typedi";

@Service()
export class UserService {
    private user = database.instance.user;

    findUser(email: string) {
        return this.user.findUnique(
            {
                where: { email }
            }
        )
    }
}