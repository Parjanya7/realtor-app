import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ProductKeyParams, SigninParams, SignupParams } from './auth.interface';
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private readonly dbService: DatabaseService) {}

    async signup(params: SignupParams, userType: UserType): Promise<string> {
        let { email, password, name, phone } = params;
        
        const userExists = await this.dbService.users.findUnique({
            select: {
                id: true,
                email: true
            },
            where: {
                email
            },
        });

        if (userExists) {
            throw new ConflictException();
        }

        const hashed = await bcrypt.hash(password, 10);

        const userData = {
            name,
            email,
            password: hashed,
            phone_number: phone,
            user_type: userType
        };
        const user = await this.dbService.users.create({
            data: userData
        });

        const token = await this.sign({ id: user.id, email, name });

        return token;
    }

    async signin(params: SigninParams): Promise<string> {
        const { email, password } = params;

        const user = await this.dbService.users.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
                password: true
            },
            where: {
                email
            }
        });

        if (!user) {
            throw new HttpException('Invalid Credentials', 400);
        }

        const hashed = user.password;
        const isValid = await bcrypt.compare(password, hashed);

        if (!isValid) {
            throw new HttpException('Invalid Credentials', 400);
        }

        const { id, name } = user;
        const token = await this.sign({ id, email, name });

        return token;
    }

    async generateProductKey(params: ProductKeyParams): Promise<string> {
        const { email, userType } = params;
        const toBeHashed = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`

        const hashed = await bcrypt.hash(toBeHashed, 10);
        return hashed;
    }

    private async sign(body: Record<string, any>): Promise<string> {
        const token = await jwt.sign(body, process.env.JSON_WEB_SECRET, {
            expiresIn: 360000
        });

        return token;
    }
}
