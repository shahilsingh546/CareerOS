import Logout from "./logout"
export default function Navbar() {
    return (
        <div>
            <nav
                className="flex py-2 px-4 md:px-8 bg-white border-b border-slate-300 min-h-[68px] relative z-20"
                aria-label="Main navigation">
                <div className="max-w-7xl mx-auto flex items-center gap-4 w-full">
                    <a href="/"
                        className="min-w-9 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded shrink-0">
                        <span className="sr-only">CareerOS</span>
                        <img src="/careeros-logo.svg" alt="CareerOS logo" className="h-9 w-auto" />
                    </a>

                    <div id="collapseMenu"
                        className="hidden lg:block max-lg:bg-white max-lg:border-l max-lg:border-slate-300 max-lg:w-1/2 max-lg:fixed max-lg:top-0 max-lg:right-0 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto max-sm:w-full z-50 outline-none">

                        <div
                            className="py-2 px-4 flex items-center justify-between border-b border-slate-300 sticky top-0 bg-white lg:hidden max-lg:min-h-[68px]">
                            <a href="#"
                                className="min-w-9 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                                <span className="sr-only">Your Company</span>
                                <img src="/careeros-logo.svg" alt="CareerOS logo" className="h-9 w-auto" />
                            </a>
                            <button type="button" aria-controls="collapseMenu" id="toggleClose"
                                className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                                <span className="sr-only">Close main menu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 fill-slate-900"
                                    aria-hidden="true" viewBox="0 0 329.269 329">
                                    <path
                                        d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0"
                                        data-original="#000000" />
                                </svg>
                            </button>
                        </div>

                        <ul
                            className="flex flex-col gap-8 font-semibold text-sm text-slate-900 lg:flex-row max-lg:p-6 lg:ml-12">
                            <li>
                                <a href="#"
                                    className="hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                                    aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#"
                                    className="hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Job Board</a>
                            </li>
                            <li>
                                <a href="#"
                                    className="hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Interviews</a>
                            </li>
                            <li>
                                <a href="#"
                                    className="hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Notes</a>
                            </li>
                            <li>
                                <a href="#"
                                    className="hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">Offers</a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        <form className="max-w-xs" role="search">
                            <div
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600">
                                <label htmlFor="search" className="sr-only">Search</label>
                                <input type="search" id="search" placeholder="Search..." required
                                    className="text-sm text-slate-900 w-full outline-none" />

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" className="size-4 fill-slate-400 ml-auto"
                                    aria-hidden="true">
                                    <path
                                        d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                                    </path>
                                </svg>
                            </div>
                        </form>

                        <button type="button" aria-controls="collapseMenu" aria-expanded="false" aria-haspopup="true" id="toggleOpen"
                            className="cursor-pointer lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                            <span className="sr-only">Open main menu</span>
                            <svg className="size-7 fill-slate-900" aria-hidden="true" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </button>
                        <Logout/>
                        <div className="relative w-10 h-10 overflow-hidden bg-neutral-secondary-medium rounded-full">
                            <svg className="absolute w-12 h-12 text-body-subtle -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fliprule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}