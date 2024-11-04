import { CreatePettyCashReportDTO } from "@data/dtos/pettyCash/create_petty_cash.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { PettyCashFinancialService } from "@data/services/petty_cash_financial.service";
import { UserService } from "@data/services/user.service";
import { DateToMiliSeconds } from "@infrastructure/common/epoch-converter";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class CreatePettyCashReportUseCase {
    @Inject()
    private petty_cash_financial: PettyCashFinancialService;
    @Inject()
    private user_service: UserService;

    public async call(req: RequestWithUser, property_id: string, data: CreatePettyCashReportDTO) {
        const role = req.user.role;
        const staff_id = req.user.id;

        if (role === Roles.STUDENT) {
            throw new HttpError(400, 'Student not Authorized');
        }

        const staff = await this.user_service.findUserWithId(staff_id);
        if (!staff) {
            throw new HttpError(400, 'User not found')
        }

        const report = await this.petty_cash_financial.createPettyCashReportForProperty(property_id, staff_id, data);
        const response = {
            id: report.id,
            purpose: report.purpose,
            notes: report.notes || '',
            credit: report.credit,
            deposit: report.deposit,
            staff_name: staff.name || '',
            created_at: DateToMiliSeconds(report.createdAt),
        }

        return new HttpResponse(response, false);
    }
}