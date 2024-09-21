import { HttpCode, Get, JsonController } from "routing-controllers";

@JsonController('/health-check')
export class HealthCheckController {
  @Get('/')
  @HttpCode(200)
  confirmHealthCheck() {
    return true;
  }
}
