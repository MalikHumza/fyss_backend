import { App } from "./app";
import { HealthCheckController } from "@infrastructure/controllers/health_check.controller";
import { AuthController } from "@infrastructure/controllers/auth.controller";
import { UserController } from "@infrastructure/controllers/user.controller";
import { ValidateEnv } from "@infrastructure/common/validateEnv";
import { RoomCheckController } from "@infrastructure/controllers/room_check.controller";
import { SavingsController } from "@infrastructure/controllers/savings.controller";
import { ActionsPlanController } from "@infrastructure/controllers/action_plan.controller";
import { SupportPlanController } from "@infrastructure/controllers/support.controller";

ValidateEnv();

const app = new App([
  AuthController,
  UserController,
  RoomCheckController,
  SavingsController,
  ActionsPlanController,
  SupportPlanController,
  HealthCheckController,
]);

app.listen();
