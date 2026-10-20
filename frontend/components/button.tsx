type ButtonsProps ={
    buttonName: string,
    onClick?:()=> void;
    type?: "button" | "submit" | "reset"
};

export default function Buttons({buttonName, onClick, type="button"}:ButtonsProps) {
    return (
        <div>
            <div>

                {/* <!-- button set 2 rounded --> */}
                <div className="flex gap-4 flex-wrap">
                    <button type={type}
                        onClick={onClick}
                        className="px-3.5 py-2 text-white text-sm font-semibold cursor-pointer bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                        {buttonName}</button>
                </div>
            </div>
        </div>
    )
}

