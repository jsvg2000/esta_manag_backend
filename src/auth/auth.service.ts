import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService:JwtService,
        private prisma:PrismaService
    ){}

    async validateUser(user:LoginDto){
        const foundUser = await this.prisma.user.findUnique({
            where:{ email: user.email}
        });

        if(!foundUser) return null;

        if(foundUser.password === user.password){
            const data={
                    roleId: foundUser.roleId,
                    name: foundUser.name,
                    token : this.jwtService.sign({
                    id:foundUser.id,
                    email:foundUser.email,
                    role: foundUser.roleId
                })
            }
            
            return data
        }

    }
}
