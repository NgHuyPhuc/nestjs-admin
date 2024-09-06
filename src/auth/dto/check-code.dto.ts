import { IsNotEmpty } from "class-validator";

export class CheckCode {

    @IsNotEmpty({message: "id khong duoc de trong"})
    id: string;

    @IsNotEmpty({message: "code khong duoc de trong"})
    code: string;

}
