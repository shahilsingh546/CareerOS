'use client'
import { useRouter } from "next/navigation";
import Buttons from "./button";
export default function Logout(){
    const router = useRouter();

   async function handleLogout(){
        console.log("hi i'm clicked");
        try{
            await fetch("http://localhost:3002/logout", {
                method:"POST",
                credentials: "include"
            });
            router.push("/api/signin");
        }
        catch(err){
            console.error("logout failed", err)
        }
    }
    return (
        <div>
            <Buttons buttonName="Logout" onClick={handleLogout}/>
        </div>
    );
}