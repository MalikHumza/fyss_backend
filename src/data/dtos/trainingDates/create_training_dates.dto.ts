import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Service } from "typedi";

@Service()
export class CreateTrainingDatesDTO {
    @IsString()
    @IsNotEmpty()
    readonly topic: string;

    @IsString()
    @IsNotEmpty()
    readonly summary: string;

    @IsString()
    @IsNotEmpty()
    readonly notes: string;

    @IsNumber()
    @IsNotEmpty()
    readonly from: number;

    @IsNumber()
    @IsNotEmpty()
    readonly to: number;
}