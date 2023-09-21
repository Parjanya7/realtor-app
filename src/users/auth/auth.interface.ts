import { UserType } from "@prisma/client";

export interface SignupParams {
    email: string;
    name: string;
    phone: string;
    password: string;
}

export interface SigninParams {
    email: string;
    password: string;
}

export interface ProductKeyParams {
    email: string;
    userType: UserType
}