import { ValidateEnv } from "@infrastructure/common/validateEnv";
import { App } from "./app";
import { HealthCheckController } from "@infrastructure/controllers/health_check.controller";

ValidateEnv();

const app = new App([
    HealthCheckController
]);


app.listen();