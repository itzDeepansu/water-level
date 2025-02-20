import prisma from '../../libs/prismadb'
import { NextResponse } from "next/server";
export async function POST(req) {
    const body = await req.json();
    const data = await prisma.user.findUnique(
        {
            where: {
                username: body.username
            }
        }
    );
    return NextResponse.json(data);
}