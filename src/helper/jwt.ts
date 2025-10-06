import jwt,{ JwtPayload, SignOptions } from "jsonwebtoken";

export const generarateToken=(payload:JwtPayload, secret:string, expiresIn:string)=>{
    const token=jwt.sign(payload,secret,{
        expiresIn
    } as SignOptions)
    return token
}
export const verifyToken=(token:string, secret:string)=>{
    const verifyedToken=jwt.verify(token,secret);
    return verifyedToken
}