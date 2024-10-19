import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class CreateSavingLogsDTO {
    @IsString()
    @IsNotEmpty()
    readonly staff_name: string;

    @IsString()
    @IsNotEmpty()
    readonly student_name: string;

    @IsString()
    @IsNotEmpty()
    readonly student_email: string;

    @IsString()
    @IsNotEmpty()
    readonly deposited_by: string;

    @IsString()
    @IsNotEmpty()
    readonly recieved_by: string;

    @IsNumber()
    @IsNotEmpty()
    readonly deposited_amount: number;
}