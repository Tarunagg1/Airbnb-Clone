import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismaedb";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            email,
            name,
            password,
        } = body;

        const hashedPasswords = await bcrypt.hash(password, 12);
        console.log(hashedPasswords);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPasswords,
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
    }
}
