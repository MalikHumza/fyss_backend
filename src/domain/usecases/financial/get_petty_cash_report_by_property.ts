import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { PettyCashBalanceService } from "@data/services/get_petty_cash_balance.service";
import { PettyCashFinancialService } from "@data/services/petty_cash_financial.service";
import { UserService } from "@data/services/user.service";
import { Roles } from "@prisma/client";
import { HttpError } from "routing-controllers";
import { Inject, Service } from "typedi";

@Service()
export class GetPettyCashFinancialByPropertyUseCase {
    @Inject()
    private petty_cash_financial: PettyCashFinancialService;
    @Inject()
    private petty_cash_balance: PettyCashBalanceService;
    @Inject()
    private user_service: UserService;

    public async call(req: RequestWithUser, property_id: string) {
        const role = req.user.role;
        if (role === Roles.STUDENT) {
            throw new HttpError(400, 'Student not Authorized');
        }
        const report = await this.petty_cash_financial.getAllPettyCashReportByProperty(property_id);
        const balance = await this.petty_cash_balance.getPettyCashBalanceByProperty(property_id);
        const response = await Promise.all(
            report.map(async i => {
                const user = await this.user_service.findUserWithId(i.staff_id);
                return {
                    id: i.id,
                    purpose: i.purpose,
                    notes: i.notes,
                    credit: i.credit,
                    deposit: i.deposit,
                    balance: balance[0].balance,
                    staff_name: user.name
                };
            }),
        );

        return new HttpResponse(response, false);
    }
}