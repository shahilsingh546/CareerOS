import { NextRequest, NextResponse } from "next/server";
import {jwtVerify} from "jose";

const secretKey= new TextEncoder().encode(process.env.secretKey)

export async function middleware(request: NextRequest){
    const token = request.cookies.get('token')?.value;
    console.log("token value -> ", token);
    
    if(!token){
        return NextResponse.redirect(new URL("/api/signin", request.url));
    }

    try{
        const {payload} = await jwtVerify(token,secretKey);
        const userId = payload.userId as number;

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("userId",String(userId));

        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
        })
    }
    catch{
        return NextResponse.redirect(new URL("/api/signin", request.url))
    }
}

export const config = {
    matcher: ["/"]
}