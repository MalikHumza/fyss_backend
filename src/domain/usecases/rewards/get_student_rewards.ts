import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { RewardsService } from "@data/services/rewards.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class GetStudentRewardsUseCase {
  @Inject()
  private rewardsService: RewardsService;

  public async call(req: RequestWithUser) {
    const { id, email } = req.user;
    const getrewards = await this.rewardsService.getStudentRewards(id, email);
    if (getrewards) {
      const response = {
        id: getrewards.id,
        staff_name: getrewards.staff_name || "",
        type: getrewards.type,
        reason: getrewards.reason || "",
        points_allocation: getrewards.points,
        reflection: getrewards.reflection || "",
        notes: getrewards.notes || "",
        level: getrewards.level,
        level_points: getrewards.level_points,
        date: DateToMiliSeconds(getrewards.updatedAt),
      };
      return new HttpResponse(response, false);
    }
    throw new HttpError(400, "No Rewards found for student");
  }
}
