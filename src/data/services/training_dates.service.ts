import database from "@config/database";
import { CreateTrainingDatesDTO } from "@data/dtos/trainingDates/create_training_dates.dto";
import { Service } from "typedi";

@Service()
export class TrainingDateService {
  private training = database.instance.trainingDates;

  getAllTrainingRecordsByPropertyId(property_id: string) {
    return this.training.findMany({
      where: {
        property_id
      },
    });
  }

  createTrainingForProperty(property_id: string, staff_id: string, data: CreateTrainingDatesDTO) {
    return this.training.create({
      data: {
        property_id,
        staff_id,
        topic: data.topic,
        summary: data.summary,
        notes: data.notes,
        from: data.from,
        to: data.to
      }
    })
  }
}
