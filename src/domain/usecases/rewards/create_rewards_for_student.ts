import { CreateStudentRewardsDTO } from "@data/dtos/rewards/create_student_rewards.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { RewardsService } from "@data/services/rewards.service";
import { RewardScoringService } from "@data/services/rewards_scoring";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Inject, Service } from "typedi";

@Service()
export class CreateRewardsForStudentUseCase {
  @Inject()
  private rewardService: RewardsService;
  @Inject()
  private rewardsScoring: RewardScoringService;

  public async call(
    req: RequestWithUser,
    student_id: string,
    data: CreateStudentRewardsDTO,
  ) {
    const staff_id = req.user.id;
    const staff_name = req.user.name;

    const points = await this.rewardsScoring.getRewardPointsByName(
      data.reward_key,
    );
    const rewards = await this.rewardService.createRewardsForStudent(
      staff_id,
      staff_name,
      student_id,
      points.value,
      data,
    );
    const response = {
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
    return new HttpResponse(response, false);
  }
}
