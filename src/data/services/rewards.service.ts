import database from "@config/database";
import { Service } from "typedi";

@Service()
export class RewardsService {
  private rewards = database.instance.rewards;

  getStudentRewards(id: string, email: string) {
    return this.rewards.findMany({
      where: {
        student_id: id,
        student_email: email,
      },
    });
  }
}
