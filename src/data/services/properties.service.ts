import database from "@config/database";
import { CreatePropertyDTO } from "@data/dtos/properties/create_property.dto";
import { Service } from "typedi";

@Service()
export class PropertiesService {
  private properties = database.instance.properties;
  private staff_has_property = database.instance.staffHasProperty;

  getAllProperties() {
    return this.properties.findMany();
  }

  getPropertiesById(ids: string[]) {
    return this.properties.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });
  }

  getStaffHasProperty(staff_id: string) {
    return this.staff_has_property.findMany({
      where: {
        staff_id
      }
    })
  }

  getPropertyById(id: string) {
    return this.properties.findUnique({ where: { id } });
  }

  createProperty(data: CreatePropertyDTO) {
    return this.properties.create({
      data: {
        name: data.name,
        location: data.location,
        occupancy: data.occupancy,
        image: data.image,
        description: data.description
      }
    });
  }

  addStaffToProperty(property_id: string, staff_id: string) {
    return this.staff_has_property.create({
      data: {
        property_id,
        staff_id,
      }
    })
  }
}
