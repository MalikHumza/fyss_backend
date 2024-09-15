import { ValidateEnv } from "@infrastructure/common/validateEnv";
import { App } from "./app";
import { HealthCheckController } from "@infrastructure/controllers/health_check.controller";
import { AuthController } from "@infrastructure/controllers/auth.controller";
import { UserController } from "@infrastructure/controllers/user.controller";

ValidateEnv();

const app = new App([AuthController, UserController, HealthCheckController]);

app.listen();
