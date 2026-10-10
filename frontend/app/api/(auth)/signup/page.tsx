export default function signin() {
   return (
      <div>
         <main className="bg-white md:h-screen dark:bg-neutral-900">
            <div className="grid md:grid-cols-2 items-center w-full h-full">
               <div className="max-md:order-1 p-4">
                  <img src="/signup.webp"
                     className="lg:max-w-3/4 w-full h-full aspect-square object-contain block mx-auto" alt="login-image" />
               </div>

               <div className="flex items-center px-8 py-12 bg-[#0C172C] w-full h-full lg:p-12 dark:bg-neutral-800">
                  <div className="max-w-md mx-auto w-full">
                     <div className="mb-10">
                        <h1 className="text-2xl font-bold text-slate-50">Create an account</h1>
                     </div>

                     <form className="space-y-6 w-full">
                        <div>
                           <label htmlFor="username" className="mb-2 text-slate-50 font-medium text-sm inline-block">Username</label>
                           <input type="username" id="username" name="username" placeholder="john1234" required
                              className="px-3 py-2.5 text-sm text-slate-50 rounded-md bg-gray-800 w-full outline-1 -outline-offset-1 outline-gray-700 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:bg-neutral-700 dark:outline-neutral-600" />
                        </div>
                        <div>
                           <label htmlFor="password" className="mb-2 text-slate-50 font-medium text-sm inline-block">Password</label>
                           <input type="password" id="password" name="password" placeholder="••••••••" required
                              className="px-3 py-2.5 text-sm text-slate-50 rounded-md bg-gray-800 w-full outline-1 -outline-offset-1 outline-gray-700 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:bg-neutral-700 dark:outline-neutral-600" />
                        </div>
                        <div>
                           <label htmlFor="confirm-password" className="mb-2 text-slate-50 font-medium text-sm inline-block">Confirm
                              password</label>
                           <input type="password" id="confirm-password" name="confirm-password" placeholder="••••••••" required
                              className="px-3 py-2.5 text-sm text-slate-50 rounded-md bg-gray-800 w-full outline-1 -outline-offset-1 outline-gray-700 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:bg-neutral-700 dark:outline-neutral-600" />
                        </div>

                        <div>
                           <label htmlFor="phone" className="mb-2 text-slate-50 font-medium text-sm inline-block">Phone Number</label>
                           <input type="phone" id="phone" name="phone" placeholder="+91-9876543210"
                              className="px-3 py-2.5 text-sm text-slate-50 rounded-md bg-gray-800 w-full outline-1 -outline-offset-1 outline-gray-700 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:bg-neutral-700 dark:outline-neutral-600" />
                        </div>

                        <div>
                           <label htmlFor="about" className="mb-2 text-slate-50 font-medium text-sm inline-block">About</label>
                           <input type="about" id="about" name="about" placeholder="A Software Engineer at FinTech"
                              className="px-3 py-2.5 text-sm text-slate-50 rounded-md bg-gray-800 w-full outline-1 -outline-offset-1 outline-gray-700 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:bg-neutral-700 dark:outline-neutral-600" />
                        </div>

                        <button type="submit"
                           className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                           Create an account</button>
                     </form>

                     <div className="mt-6 text-slate-50 text-sm text-center">Already have an account? <a href="/api/signin"
                        className="text-blue-500 hover:underline ml-1 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                        Login here</a>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </div>
   )
}