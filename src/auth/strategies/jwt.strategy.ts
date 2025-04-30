import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt} from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'af1475370f075ab1a0367343072b984e', 
        });
        
    }

    async validate(payload:any) {
        return{
            userId:payload.id,
            email: payload.email,
            role: payload.role
        }
    }
}