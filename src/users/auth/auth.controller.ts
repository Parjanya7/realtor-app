import { Controller, Post, Body, Param, ParseEnumPipe, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProductKeyDto, SigninDto, SignupDto } from './auth.dto';
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup/:userType')
    async signup(
        @Body() body: SignupDto,
        @Param('userType', new ParseEnumPipe(UserType)) userType: UserType
    ): Promise<Record<string, string>> {
        if (userType != UserType.BUYER) {
            if (!body.productKey) {
                throw new UnauthorizedException()
            }

            const { email, productKey } = body;
            const validKeyString = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;
            const isValid = await bcrypt.compare(validKeyString, productKey);

            if (!isValid) {
                throw new UnauthorizedException()
            }
        }

        const token = await this.authService.signup(body, userType);
        return { message: 'Succesfull Signup!', token };
    }

    @Post('/signin')
    async signin(@Body() body: SigninDto): Promise<Record<string, string>> {
        const token = await this.authService.signin(body);
        return { messag: 'Succesfull Login!', token };
    }

    @Post('/key')
    async generateProductKey(@Body() body: ProductKeyDto ): Promise<Record<string, string>> {
        const { userType } = body;
        if (userType !== UserType.REALTOR) {
            throw new UnauthorizedException();
        }
        const productKey = await this.authService.generateProductKey(body);
        return { message: 'Validation Succesfull!', productKey };
    }
}
