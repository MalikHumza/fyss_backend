import { CreateStudentRewardsDTO } from "@data/dtos/rewards/create_student_rewards.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { CreateRewardsForStudentUseCase } from "@domain/usecases/rewards/create_rewards_for_student";
import { GetStudentRewardsUseCase } from "@domain/usecases/rewards/get_student_rewards";
import { CheckTokenExpiry } from "@infrastructure/middlewares/token_expiry.middleware";
import { ValidationMiddleware } from "@infrastructure/middlewares/validation.middleware";
import {
  Authorized,
  Body,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
  Req,
  UseBefore,
} from "routing-controllers";
import Container from "typedi";

@JsonController("/rewards")
@UseBefore(CheckTokenExpiry)
@Authorized()
export class RewardsController {
  private getStudentRewardsUseCase = Container.get(GetStudentRewardsUseCase);
  private createRewardsForStudentUseCase = Container.get(CreateRewardsForStudentUseCase);

  @Get("/student")
  @HttpCode(200)
  getStudentRewards(@Req() req: RequestWithUser) {
    return this.getStudentRewardsUseCase.call(req);
  }

  @Post('/create/:student_id')
  @UseBefore(ValidationMiddleware(CreateStudentRewardsDTO))
  @HttpCode(201)
  createRewardsForStudent(@Req() req: RequestWithUser, @Param('student_id') student_id: string, @Body() data: CreateStudentRewardsDTO) {
    return this.createRewardsForStudentUseCase.call(req, student_id, data);
  }
}
