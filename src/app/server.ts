import { ValidateEnv } from "@infrastructure/common/validateEnv";
import { App } from "./app";
import { HealthCheckController } from "@infrastructure/controllers/health_check.controller";
import { AuthController } from "@infrastructure/controllers/auth.controller";

ValidateEnv();

const app = new App([
    AuthController,
    HealthCheckController
]);

app.listen();
