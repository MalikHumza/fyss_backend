import database from "@config/database";
import { Service } from "typedi";

@Service()
export class StudentRewardsProgressService {
  private rewards_progress = database.instance.studentRewardsProgress;

  createStudentRewardsProgress(
    student_id: string,
    current_points: number,
    current_level: number,
    points_to_next: number,
    total_points: number,
  ) {
    return this.rewards_progress.create({
      data: {
        student_id,
        current_points,
        current_level,
        points_to_next,
        total_points,
      },
    });
  }

  getRewardsProgressByStudentId(student_id: string) {
    return this.rewards_progress.findUnique({
      where: {
        student_id,
      },
    });
  }

  updateStudentRewardsProgress(
    id: string,
    student_id: string,
    current_points: number,
    current_level: number,
    points_to_next: number,
    total_points: number,
  ) {
    return this.rewards_progress.update({
      data: {
        student_id,
        current_points,
        current_level,
        points_to_next,
        total_points,
      },
      where: {
        id,
      },
    });
  }
}
