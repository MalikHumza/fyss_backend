import { App } from "./app";
import { HealthCheckController } from "@infrastructure/controllers/health_check.controller";
import { AuthController } from "@infrastructure/controllers/auth.controller";
import { UserController } from "@infrastructure/controllers/user.controller";
import { ValidateEnv } from "@infrastructure/common/validateEnv";
import { RoomCheckController } from "@infrastructure/controllers/room_check.controller";
import { SavingsController } from "@infrastructure/controllers/savings.controller";
import { ActionsPlanController } from "@infrastructure/controllers/action_plan.controller";
import { SupportPlanController } from "@infrastructure/controllers/support.controller";
import { StudentHealthCheckController } from "@infrastructure/controllers/student_health.controller";
import { RewardsController } from "@infrastructure/controllers/rewards.controller";
import { AdminController } from "@infrastructure/controllers/admin.controller";
import { PropertiesController } from "@infrastructure/controllers/properties.controller";
import { ShiftTrackerController } from "@infrastructure/controllers/shift_tracker.controller";
import { TrainingDatesController } from "@infrastructure/controllers/training_dates.controller";
import { InventoryController } from "@infrastructure/controllers/inventory.controller";

ValidateEnv();

const app = new App([
  AuthController,
  UserController,
  RoomCheckController,
  SavingsController,
  ActionsPlanController,
  SupportPlanController,
  StudentHealthCheckController,
  RewardsController,
  HealthCheckController,
  AdminController,
  PropertiesController,
  ShiftTrackerController,
  TrainingDatesController,
  InventoryController,
]);

app.listen();
