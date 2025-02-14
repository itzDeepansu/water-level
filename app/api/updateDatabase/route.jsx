import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
    const threshold = 10;
  const body = await req.json();
  const {username , isactive , currentwaterlevel} = body
  const data = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if(isactive === false){
    await prisma.user.update({
        where: {id:data.id},
        data:{
            currentwaterlevel: currentwaterlevel,
            isactive: isactive,
            timeleft:null,
            estimatedfilltime:null,
            lastupdatetime:null
        }
    })
  }
  return NextResponse.json(data);
}
