import database from "@config/database";
import { Service } from "typedi";

@Service()
export class TrainingDateService {
  private training = database.instance.trainingDates;

  getAllTrainingRecordsByPropertyid(property_id: string, staff_id: string) {
    return this.training.findMany({
      where: {
        property_id,
        property: {
          staff_id,
        },
      },
    });
  }
}
