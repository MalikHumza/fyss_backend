import { CreateStudentRewardsDTO } from "@data/dtos/rewards/create_student_rewards.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { RewardsService } from "@data/services/rewards.service";
import { RewardScoringService } from "@data/services/rewards_scoring.service";
import { StudentRewardsProgressService } from "@data/services/student_rewards_progress.service";
import { UserService } from "@data/services/user.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { logger } from "@infrastructure/common/logger";
import { getSum } from "@infrastructure/common/math";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class CreateRewardsForStudentUseCase {
  @Inject()
  private rewardService: RewardsService;
  @Inject()
  private rewardsScoring: RewardScoringService;
  @Inject()
  private rewardsProgress: StudentRewardsProgressService;
  @Inject()
  private userService: UserService;

  public async call(
    req: RequestWithUser,
    student_id: string,
    data: CreateStudentRewardsDTO,
  ) {
    try {
      const staff_id = req.user.id;
      const staff_name = req.user.name;
      const role = req.user.role;

      if (role === Roles.STUDENT) {
        throw new HttpError(400, "Not Authorized");
      }

      if (!student_id) {
        throw new HttpError(400, "Student Id cannot be empty");
      }

      const student = await this.userService.findUserWithId(student_id);
      if (!student) {
        throw new HttpError(400, "Student does not exist");
      }

      const MAX_CURRENT_POINTS = parseInt(
        process.env.MAX_CURRENT_POINTS || "500",
        10,
      );
      const points = await this.rewardsScoring.getRewardPointsByName(
        data.reward_key,
      );

      const progress =
        await this.rewardsProgress.getRewardsProgressByStudentId(student_id);
      if (!progress) {
        const rewards = await this.createStudentRewards(
          staff_id,
          staff_name,
          student_id,
          student.email,
          points.value,
          data,
        );
        const points_to_next = MAX_CURRENT_POINTS - rewards.points;
        await this.rewardsProgress.createStudentRewardsProgress(
          student_id,
          rewards.points,
          0,
          points_to_next,
          rewards.points,
        );
        const response = this.buildRewardsResponse(
          rewards,
          staff_id,
          staff_name,
          student_id,
        );

        return new HttpResponse(response, false);
      }

      const rewards = await this.createStudentRewards(
        staff_id,
        staff_name,
        student_id,
        student.email,
        points.value,
        data,
      );

      const reward_points = await this.rewardService.getStudentRewards(
        student_id,
        student.email,
      );
      const sum_of_points = getSum(reward_points.map((i) => i.points));

      let current_points = progress.current_points;
      let new_level = progress.current_level;

      // Check if current points reach or exceed MAX_CURRENT_POINTS
      if (current_points === MAX_CURRENT_POINTS) {
        current_points = 0; // Reset points to zero if at the limit
        new_level += 1; // Level-up
      }

      const progress_points = current_points + points.value;

      if (progress_points > MAX_CURRENT_POINTS) {
        new_level += 1; // Level up
        current_points = progress_points - MAX_CURRENT_POINTS; // Start new level with leftover points
      } else {
        current_points = progress_points; // No level up, just add points
      }

      const points_to_next = MAX_CURRENT_POINTS - current_points;

      await this.rewardsProgress.updateStudentRewardsProgress(
        progress.id,
        student_id,
        current_points,
        new_level,
        points_to_next,
        sum_of_points,
      );

      const response = this.buildRewardsResponse(
        rewards,
        staff_id,
        staff_name,
        student_id,
      );
      return new HttpResponse(response, false);
    } catch (error) {
      logger.info(`Error creating rewards for student`, error);
      throw new HttpError(400, "Error creating rewards for student");
    }
  }

  private async createStudentRewards(
    staff_id: string,
    staff_name: string,
    student_id: string,
    student_email: string,
    value: number,
    data: CreateStudentRewardsDTO,
  ) {
    const rewards = await this.rewardService.createRewardsForStudent(
      staff_id,
      staff_name,
      student_id,
      student_email,
      value,
      data,
    );
    return rewards;
  }

  private buildRewardsResponse(
    rewards: any,
    staff_id: string,
    staff_name: string,
    student_id: string,
  ) {
    return {
      id: rewards.id,
      staff_id,
      staff_name,
      student_id,
      student_email: rewards.student_email,
      type: rewards.type,
      rewards_key: rewards.reward_key,
      reason: rewards.reason,
      points: rewards.points,
      reflection: rewards.reflection,
      notes: rewards.notes,
      created_at: DateToMiliSeconds(rewards.createdAt),
    };
  }
}
