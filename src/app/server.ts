import { App } from "./app";
import { HealthCheckController } from "@infrastructure/controllers/health_check.controller";
import { AuthController } from "@infrastructure/controllers/auth.controller";
import { UserController } from "@infrastructure/controllers/user.controller";
import { ValidateEnv } from "@infrastructure/common/validateEnv";
import { RoomCheckController } from "@infrastructure/controllers/room_check.controller";
import { SavingsController } from "@infrastructure/controllers/savings.controller";

ValidateEnv();

const app = new App([
  AuthController,
  UserController,
  RoomCheckController,
  SavingsController,
  HealthCheckController,
]);

app.listen();
