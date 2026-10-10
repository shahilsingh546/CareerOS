export default function StatsCard() {
    return (
        <div className="px-4">
            <section className ="grid grid-cols-4 gap-[14px] my-[28px]" aria-label="Summary">
                <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[14px] px-[18px] py-[16px]">
                    <b className="block font-bold text-[30px] font-['Bricolage_Grotesque',_sans-serif]">6</b>
                    <span className="stat [&_span]:text-muted [&_span]:text-[14px]">Total applied</span>
                </div>
                <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[14px] px-[18px] py-[16px]">
                    <b className="block font-bold text-[30px] font-['Bricolage_Grotesque',_sans-serif]">1</b>
                    <span className="stat [&_span]:text-muted [&_span]:text-[14px]">In interviews</span>
                </div>
                <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[14px] px-[18px] py-[16px]">
                    <b className="block font-bold text-[30px] font-['Bricolage_Grotesque',_sans-serif]">1</b>
                    <span className="stat [&_span]:text-muted [&_span]:text-[14px]">Offers</span>
                </div>
                <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[14px] px-[18px] py-[16px]">
                    <b className="block font-bold text-[30px] font-['Bricolage_Grotesque',_sans-serif]">22 LPA</b>
                    <span className="stat [&_span]:text-muted [&_span]:text-[14px]">Highest offer so far</span>
                </div>
            </section>
        </div>
    )
}