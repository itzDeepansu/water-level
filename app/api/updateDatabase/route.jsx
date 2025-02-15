import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const threshold = 1; // Threshold in minutes
  const body = await req.json();
  const { username, isactive, currentwaterlevel } = body;

  if (isactive === false) {
    await prisma.user.update({
      where: { username: username },
      data: {
        currentwaterlevel: currentwaterlevel,
        isactive: isactive,
        timeleft: null,
        estimatedfilltime: null,
        lastupdatetime: null,
      },
    });
  } else {
    const data = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!data) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const currentTime = new Date();
    let differenceInMinutes = threshold; // Default to threshold if no last update time

    if (data.lastupdatetime) {
      const databaseLastUpdateTime = new Date(data.lastupdatetime).getTime();
      const differenceInMillis = currentTime.getTime() - databaseLastUpdateTime;
      
      // Convert to floating-point minutes
      differenceInMinutes = differenceInMillis / (1000 * 60);
    }

    const timeFactor = Math.max(differenceInMinutes, threshold);
    const newTimeLeft = timeFactor * (10 - currentwaterlevel);
    const newEstimatedFillTime = new Date(currentTime.getTime() + (timeFactor * 60 * 1000) * (10 - currentwaterlevel));

    await prisma.user.update({
      where: { id: data.id },
      data: {
        currentwaterlevel: currentwaterlevel,
        timeleft: newTimeLeft,
        isactive: isactive,
        estimatedfilltime: newEstimatedFillTime,
        lastupdatetime: currentTime,
      },
    });

    return NextResponse.json({
      differenceInMinutes: differenceInMinutes.toFixed(2), // Returns as float with 2 decimal places
      timeleft: newTimeLeft.toFixed(2),
      estimatedfilltime: newEstimatedFillTime,
      message: `Time difference: ${differenceInMinutes.toFixed(2)} minutes`,
    });
  }

  return NextResponse.json({ success: true });
}
