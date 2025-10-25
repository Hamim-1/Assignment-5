import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateToken = (payload: JwtPayload, secret: string, expiresIn: string) => {
    const jwtToken = jwt.sign(payload, secret, {
        expiresIn: expiresIn
    } as SignOptions);

    return jwtToken;

}

export const verifyToken = (token: string, secret: string) => {
    const verifiedToken = jwt.verify(token, secret);
    return verifiedToken;
}