import prisma from '../../libs/prismadb'
import { NextResponse } from "next/server";
export async function GET() {
    console.log("Fetching data...");
    const data = await prisma.user.findMany();
    return NextResponse.json(data);
}