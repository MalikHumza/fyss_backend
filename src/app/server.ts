import { App } from "./app";
import { HealthCheckController } from "@infrastructure/controllers/health_check.controller";
import { AuthController } from "@infrastructure/controllers/auth.controller";
import { UserController } from "@infrastructure/controllers/user.controller";
import { ValidateEnv } from "@infrastructure/common/validateEnv";
import { RoomCheckController } from "@infrastructure/controllers/room_check.controller";

ValidateEnv();

const app = new App([
  AuthController,
  UserController,
  RoomCheckController,
  HealthCheckController,
]);

app.listen();
