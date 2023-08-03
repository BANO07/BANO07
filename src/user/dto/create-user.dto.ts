import { IsUUID, IsString, Matches, IsNotEmpty, IsEmail, IsOptional } from "class-validator";
import { Role } from "../enum/role.enum";

export class CreateUserDto {

    @IsNotEmpty()
    @IsOptional()
    id:string;

    @Matches(/^[a-zA-Z0-9 ]+$/)
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9 ]+$/)
    username:string;

    @IsEmail({}, {message:'Please enter correct email'})
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    roles:Role[];

}
