import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class CreateStaffTravelExpenseDTO {
    @IsString()
    @IsNotEmpty()
    readonly purpose: string;

    @IsString()
    @IsNotEmpty()
    readonly origin: string;

    @IsString()
    @IsNotEmpty()
    readonly destination: string;

    @IsNumber()
    @IsNotEmpty()
    readonly expense: number;
}