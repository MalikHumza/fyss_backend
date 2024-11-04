import { CreateStaffTravelExpenseDTO } from "@data/dtos/travelExpense/create_staff_travel_expense.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { PropertiesService } from "@data/services/properties.service";
import { StaffTravelExpenseService } from "@data/services/staff_travel_expense.service";
import { UserService } from "@data/services/user.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class CreateStaffTravelExpenseUseCase {
    @Inject()
    private staff_travel_service: StaffTravelExpenseService;
    @Inject()
    private property_service: PropertiesService;
    @Inject()
    private user_service: UserService;

    public async call(req: RequestWithUser, property_id: string, staff_id: string, data: CreateStaffTravelExpenseDTO) {
        const role = req.user.role;
        if (role === Roles.STUDENT) {
            throw new HttpError(400, 'Student not Authorized');
        }

        const [property, user] = await Promise.all([
            this.property_service.getPropertyById(property_id),
            this.user_service.findUserWithId(staff_id)
        ]);

        if (!property) {
            throw new HttpError(400, 'Invalid Property');

        }

        if ((!user || user.role === Roles.STUDENT)) {
            throw new HttpError(400, 'Invalid User or not Authorized');
        }

        const travel = await this.staff_travel_service.createStaffTravelExpense(property_id, staff_id, data);
        const response = {
            id: travel.id,
            purpose: travel.purpose,
            from_origin: travel.origin,
            to_destination: travel.destination,
            expense: travel.expense,
            staff_name: user.name || '',
            created_at: DateToMiliSeconds(travel.createdAt)
        };

        return new HttpResponse(response, false);
    }
}