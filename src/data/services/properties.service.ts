import database from "@config/database";
import { Service } from "typedi";

@Service()
export class PropertiesService {
  private properties = database.instance.properties;

  getAllProperties() {
    return this.properties.findMany();
  }

  getPropertiesByStaffId(staff_id: string) {
    return this.properties.findMany({
      where: {
        staff_id,
      },
    });
  }
}
