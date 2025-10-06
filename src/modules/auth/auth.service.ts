import { prisma } from "../../config/db"
import { Prisma, User } from "@prisma/client"
import bcrypt from "bcryptjs"
import { generarateToken } from "../../helper/jwt";

const loginWithEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        throw new Error("User not found!")
    }
    const isPasswordMatched = await bcrypt.compare(password as string, user.password as string); // Creates a NEW hash
    if (isPasswordMatched) {
        const jwtPayload = {
            userId: user.id,
            email: user.email,
            role: user.role
        }
        const accessToken = generarateToken(jwtPayload, process.env.JWT_ACCESS_SECRET as string, process.env.JWT_ACCESS_EXPIRES as string)
        const {password:pass, ...rest}=user;
        return{
            accessToken,
            user:rest
        }
    }
    else {
        throw new Error("Password is incorrect!")
    }
}

const authWithGoogle = async (data: Prisma.UserCreateInput) => {
    let user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (!user) {
        user = await prisma.user.create({
            data
        })
    }

    return user;
}

export const AuthService = {
    loginWithEmailAndPassword,
    authWithGoogle
}