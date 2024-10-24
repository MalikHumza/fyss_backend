import database from "@config/database";
import { CreateStudentRewardsDTO } from "@data/dtos/rewards/create_student_rewards.dto";
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

  createRewardsForStudent(
    staff_id: string,
    staff_name: string,
    student_id: string,
    points: number,
    data: CreateStudentRewardsDTO,
  ) {
    return this.rewards.create({
      data: {
        staff_id,
        staff_name,
        student_id,
        points,
        ...data,
      },
    });
  }
}
