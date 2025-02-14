import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";
export async function POST(req) {
  const body = await req.json();
  const {
    username,
    currentwaterlevel,
    timeleft,
    isactive,
    estimatedfilltime,
    lastupdatetime,
  } = body;

  // Create user in database
  const user = await prisma.user.create({
    data: body
  });

  console.log("User created successfully:", user);
  return NextResponse.json(user);
}
