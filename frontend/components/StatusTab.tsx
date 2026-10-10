export default function StatusTab(){
    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-[18px] px-4">
                <button className="px-[15px] py-[7px] rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] font-medium aria-pressed:bg-[var(--brand)] aria-pressed:border-[var(--brand)] aria-pressed:text-white cursor-pointer" data-s="All" aria-pressed="false">All (6)</button>
                <button className="px-[15px] py-[7px] rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] font-medium aria-pressed:bg-[var(--brand)] aria-pressed:border-[var(--brand)] aria-pressed:text-white cursor-pointer" data-s="Applied" aria-pressed="false">Applied (3)</button>
                <button className="px-[15px] py-[7px] rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] font-medium aria-pressed:bg-[var(--brand)] aria-pressed:border-[var(--brand)] aria-pressed:text-white cursor-pointer" data-s="Interview" aria-pressed="false">Interview (1)</button>
                <button className="px-[15px] py-[7px] rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] font-medium aria-pressed:bg-[var(--brand)] aria-pressed:border-[var(--brand)] aria-pressed:text-white cursor-pointer" data-s="Offer" aria-pressed="false">Offer (1)</button>
                <button className="px-[15px] py-[7px] rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] font-medium aria-pressed:bg-[var(--brand)] aria-pressed:border-[var(--brand)] aria-pressed:text-white cursor-pointer" data-s="Rejected" aria-pressed="false">Rejected (1)</button>
            </div>
        </div>
    )
}