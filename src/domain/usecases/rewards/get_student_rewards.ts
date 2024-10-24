import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { RewardsService } from "@data/services/rewards.service";
import { StudentRewardsProgressService } from "@data/services/student_rewards_progress.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class GetStudentRewardsUseCase {
  @Inject()
  private rewardsService: RewardsService;
  @Inject()
  private rewardProgress: StudentRewardsProgressService;

  public async call(req: RequestWithUser) {
    const { id, email } = req.user;
    const getrewards = await this.rewardsService.getStudentRewards(id, email);

    if (getrewards && getrewards.length > 0) {
      const response = await Promise.all(
        getrewards.map(async (i) => {
          const progress =
            await this.rewardProgress.getRewardsProgressByStudentId(
              i.student_id,
            );
          return {
            id: i.id,
            student_id: i.student_id,
            staff_name: i.staff_name || "",
            type: i.type,
            reason: i.reason || "",
            points_allocation: `${i.points} + ${i.reward_key}`,
            reflection: i.reflection || "",
            notes: i.notes || "",
            level: progress ? progress.current_level : 0, // Use progress to get current level
            current_points: progress ? progress.current_points : 0, // Use progress to get current points
            points_to_next: progress
              ? `${progress.points_to_next} + ${progress.current_level + 1}`
              : 0, // Use progress to get points to next level
            created_at: DateToMiliSeconds(i.createdAt),
          };
        }),
      );

      return new HttpResponse(response, false);
    }

    throw new HttpError(400, "No Rewards found for student");
  }
}
