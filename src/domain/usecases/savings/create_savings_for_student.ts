import { CreateSavingLogsDTO } from "@data/dtos/savingsLogs/create_savings.dto";
import { RequestWithUser } from "@data/interfaces/request.interface";
import { HttpResponse } from "@data/res/http_response";
import { SavingsService } from "@data/services/savings.service";
import { Inject, Service } from "typedi";

@Service()
export class CreateSavingForStudentsUseCase {
    @Inject()
    private savingService: SavingsService;

    public async call(req: RequestWithUser, student_id: string, data: CreateSavingLogsDTO) {
        const staff_id = req.user.id;
        const savings = await this.savingService.createSavingsForStudent(student_id, staff_id, data);
        return new HttpResponse(savings, false);
    }
}