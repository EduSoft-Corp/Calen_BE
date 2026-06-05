import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const user = await this.userService.findByEmail(loginDto.email);

        if (!user) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
        }

        const passwordMatches =
            (await bcrypt.compare(loginDto.password, user.password)) ||
            loginDto.password === user.password;

        if (!passwordMatches) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
        }

        await this.userService.updateLastLoggedInByEmail(user.email);

        if (!user.id) {
            throw new UnauthorizedException('Tai khoan khong hop le');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            fullName: user.fullName,
        };

        return {
            accessToken: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
            },
        };
    }
}