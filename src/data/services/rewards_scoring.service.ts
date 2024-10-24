import database from "@config/database";
import { REWARD_KEYS } from "@prisma/client";
import { Service } from "typedi";

@Service()
export class RewardScoringService {
  private scoring = database.instance.rewardScoring;

  getRewardPointsByName(name: REWARD_KEYS) {
    return this.scoring.findFirst({
      where: {
        name,
      },
      select: {
        id: true,
        name: true,
        value: true,
      },
    });
  }
}
