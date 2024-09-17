import { IsNumber, IsOptional } from "class-validator";

export class PostControllerDto {
    @IsNumber()
    readonly limit: number

    @IsNumber()
    @IsOptional()
    readonly page: number

    @IsNumber()
    @IsOptional()
    readonly postId: number

}