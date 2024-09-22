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
      const response = getrewards.map((i) => ({
        id: i.id,
        staff_name: i.staff_name || "",
        type: i.type,
        reason: i.reason || "",
        points_allocation: i.points,
        reflection: i.reflection || "",
        notes: i.notes || "",
        level: 6, // TODO: need to get from response json
        level_points: 0,
        date: DateToMiliSeconds(i.updatedAt),
      }));
      return new HttpResponse(response, false);
    }
    throw new HttpError(400, "No Rewards found for student");
  }
}
