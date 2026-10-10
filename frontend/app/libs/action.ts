"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login (formData: FormData){
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
    });

    if(!res.ok){
        redirect("/api/signin?error=invalid credentials");
    }
    const setCookieHeader = res.headers.get("set-cookie");
    if(setCookieHeader){
        const tokenMatch = setCookieHeader.match(/token=([^;]+)/);
        if(tokenMatch){
            const cookieStore = await cookies();
            cookieStore.set("token", tokenMatch[1], {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 7*24*60*60,
                path:"/",
            });
        }
    }
    redirect("/");
}