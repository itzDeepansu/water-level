import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "@/app/libs/axios";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) {
    try {
        var { question } = await req.json();
        question += "extract what the user wants to ask in the above question based on the context provided that he is asking something to a water level manager application , the things which he can ask for are currentwaterlevel , isactive , timeleft , estimatedfilltime and give me answer with these only , one extra thing is that if he asks pani chal rha hai , ya motor chal rha , it means he is refering to device used to fill water in the tank , in cases related to this you should tell isactive , what he asking from these things";
        const result = await model.generateContent(question);
        var askedThings = result.response.text();

        const databaseData = await axios.post("/getData", { username: "Deepansu" });
        var nextQue = "I am giving you some data about the water level system installed in my house , here is the data";
        nextQue += JSON.stringify(databaseData.data);
        nextQue += "Use this data to answer below given questions , also do not add any jargon , just simply answer the question , no need to add things like based on data  , also refer to water filling device as motor, also the water level is in 0 to 10 , convert it to percentage by multiplying by 10, and answer only whats asked  , also answer in hinglish and no bracket explanation in english";
        nextQue+=askedThings;
        const response = await model.generateContent(nextQue);
        var responseText = response.response.text();

        return NextResponse.json({ answer: responseText });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
