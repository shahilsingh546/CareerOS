'use client'
import { useApplication } from "./ApplicationsContext"

export default function StatsCard() {

    const{applications} = useApplication();
    const totalApplications = applications.length;

    const stats = applications.reduce((acc,application)=>{
        if(application.currentStatus === 'INTERVIEW'){
            acc.interViewCount++;
        }
        if(application.currentStatus == 'OFFER'){
            acc.offerCount++;

            const packageValue = parseFloat(application.packageOffer ?? '')

            if(Number.isFinite(packageValue) && packageValue >=0){
                acc.highestPackage = Math.max(acc.highestPackage,packageValue)
            }
        }
        return acc;
    },{
        interViewCount:0,
        offerCount:0,
        highestPackage:0
    })
    // let interviewCount = 0;
    // let offerCount = 0;
    // let highestPackage = 0;

    // for(let i =0;i<applications.length;i++){
    //     if(applications[i].currentStatus === 'INTERVIEW'){
    //         interviewCount++;
    //     }
    //     else if(applications[i].currentStatus === 'OFFER'){
    //         offerCount++;
    //         highestPackage = Math.max(highestPackage,parseInt(applications[i].packageOffer))
    //     }
    // }
    return (
        <div className="px-4">
            <section className ="grid grid-cols-4 gap-[14px] my-[28px]" aria-label="Summary">
                <StatCard
                    value={totalApplications}
                    label={"Total applications"}
                />
                 <StatCard
                    value={stats.interViewCount}
                    label={"In Interviews"}
                />
                 <StatCard
                    value={stats.offerCount}
                    label={"offers"}
                /> 

                 <StatCard
                 value={stats.offerCount>0?`${stats.offerCount} LPA`:'-'}
                 label= {stats.offerCount > 0 ? 'Highest Offer so far' : 'No Offer yet'}
                 />  
            </section>
        </div>
    )
}

function StatCard({value, label}: {value:string | number; label: string}){
    return (
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[14px] px-[18px] py-[16px]">
                    <b className="block font-bold text-[30px] font-['Bricolage_Grotesque',_sans-serif]">{value}</b>
                    <span className="stat [&_span]:text-muted [&_span]:text-[14px]">{label}</span>
                </div>
    )
}