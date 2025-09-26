import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
        message: 'Valid role required: INTERN, ENGINEER, ADMIN',
    })
    role: "INTERN" | "ENGINEER" | "ADMIN";
}
