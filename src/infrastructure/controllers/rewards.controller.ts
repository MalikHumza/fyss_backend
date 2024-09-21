import { RequestWithUser } from "@data/interfaces/request.interface";
import { GetStudentRewardsUseCase } from "@domain/usecases/rewards/get_student_rewards";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import {
  Authorized,
  Get,
  HttpCode,
  JsonController,
  Req,
  UseBefore,
} from "routing-controllers";
import Container from "typedi";

@JsonController("/rewards")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class RewardsController {
  private getStudentRewardsUseCase = Container.get(GetStudentRewardsUseCase);

  @Get("/")
  @HttpCode(200)
  getStudentRewards(@Req() req: RequestWithUser) {
    return this.getStudentRewardsUseCase.call(req);
  }
}
