import { JWT_CONFIG } from "../../config";
import jwt, { Secret } from "jsonwebtoken";
  type ExpireTime = number | "1d";

export class JwtService {
    static sign<T extends object>(payload: T): string {
        try {
            const secret: Secret = JWT_CONFIG.SECRET as string;
            const token = jwt.sign(payload, secret, {
                expiresIn: (JWT_CONFIG.EXPIRE_TIME as ExpireTime) || "1d",
            });

            return token;
        } catch (err) {
            console.error("[JwtService]: cannot sign data", err);
            throw err;
        }
    }

    static verify<T extends object | string>(token: string): T {
        try {
            const secret: Secret = JWT_CONFIG.SECRET as string;
            return jwt.verify(token, secret) as T;
        } catch (err) {
            console.error("[JwtService]: cannot verify token", err);
            throw err;
        }
    }
}
