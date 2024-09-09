import { IsNotEmpty } from "class-validator";

export class ChangePassword {
    // code, _id: userId, password,confirmPassword

    @IsNotEmpty({message: "id khong duoc de trong"})
    id: string;

    @IsNotEmpty({message: "code khong duoc de trong"})
    code: string;
    
    @IsNotEmpty({message: "email khong duoc de trong"})
    email: string;

    @IsNotEmpty({message: "password khong duoc de trong"})
    password: string;

    @IsNotEmpty({message: "confirmPassword khong duoc de trong"})
    confirmPassword: string;

}
