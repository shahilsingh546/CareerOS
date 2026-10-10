"use client"
import { login } from "@/app/libs/action";
import Link from "next/link"
import { useRouter } from "next/navigation";

export default function signin() {
    const router = useRouter();
    async function handleSubmit(event:React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const username = formData.get('username');
        const password = formData.get('password')
        console.log("username -> ", username)
        console.log('password-> ', password)
        try{
            const res = await fetch('http://localhost:3002/login', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials:'include',
                body: JSON.stringify({username,password})
            })
            const data = await res.json();
            if(res.ok){
                console.log("Data -> ", data)
                router.push("/")
            }
            else{
                console.log("submission failed")
            }
        }
        catch(error){
            console.error("error connecting to backend")
            console.log("getting error")
        }
        console.log("form submitted")

        alert("form submit")
    }
    return (
        <div>
            <main className="min-h-screen flex flex-col items-center justify-center">
                <div className="py-4 px-4 md:px-8">
                    <div className="grid items-center gap-6 max-w-6xl w-full lg:grid-cols-2">
                        <div
                            className="border border-slate-300 rounded-lg p-6 max-w-md mx-auto shadow-sm md:p-8 lg:mx-0">

                            <div className="mb-8">
                                <h1 className="text-slate-900 text-3xl font-bold mb-4">Sign in</h1>
                                <p className="text-slate-600 text-base leading-relaxed">Sign in to your account to access
                                    your dashboard.</p>
                            </div>

                            <form action={login} className="space-y-6">
                                <div>
                                    <label htmlFor="username"
                                        className="mb-2 text-slate-900 font-medium text-sm inline-block">Username</label>
                                    <input type="username" id="username" name="username" placeholder="johndoe@123" required
                                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600" />
                                </div>
                                <div>
                                    <label htmlFor="password"
                                        className="mb-2 text-slate-900 font-medium text-sm inline-block">Password</label>
                                    <input type="password" id="password" name="password" placeholder="••••••••" required
                                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600" />
                                </div>

                                <button type="submit"
                                    className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                                    Sign in</button>

                                <div className="text-slate-900 text-sm text-center">Don't have an account? <Link href="/api/signup"
                                    className="text-blue-700 hover:underline ml-1 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Sign
                                    up</Link>
                                </div>
                            </form>
                        </div>

                        <div className="aspect-[71/50] max-lg:w-4/5 mx-auto">
                            <img src="/signin.webp" className="w-full object-cover"
                                alt="login img" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
