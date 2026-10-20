"use client"
import { useApplication } from "./ApplicationsContext"

export default function StatusTab() {

    const { applications, selectedStatus, setselectedStatus } = useApplication();

    const jobStatusMapping = [
        { label: 'All', value: 'ALL' },
        { label: 'Applied', value: 'APPLIED' },
        { label: 'OA', value: 'OA' },
        { label: 'Interview', value: 'INTERVIEW' },
        { label: 'HR', value: 'HR' },
        { label: 'Offer', value: 'OFFER' },
        { label: 'Rejected', value: 'REJECTED' },
        { label: 'Withdrawn', value: 'WITHDRAWN' }
    ]

    // const jobStatus = ['APPLIED', 'OA', 'INTERVIEW', 'HR', 'OFFER', 'REJECTED', 'WITHDRAWN']
    const statusSummary = applications.reduce<Record<string, number>>((summary, job) => {
        const status = job.currentStatus
        summary[status] = (summary[status] || 0) + 1;
        return summary
    }, {})

    console.log("statusSummary -> ", statusSummary)

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-[18px] px-4">
                {jobStatusMapping.map((status) => {

                    const isActive = selectedStatus === status.value;

                    const count = status.value === 'ALL' ? applications.length : statusSummary[status.value] ?? 0;

                    if (status.value !== 'ALL' && count === 0) {
                        return null
                    }
                    return (
                        <button
                            key={status.label}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setselectedStatus(status.value)}
                            className={`px-[15px] py-[7px] rounded-full border font-medium cursor-pointer ${
                                isActive
                                    ? "bg-indigo-600 border-indigo-600 text-white"
                                    : "border-[var(--line)] bg-white text-[#5B6078]"
                            }`}
                        >
                            {status.label} ({status.value === "ALL" ? applications.length : statusSummary[status.value] ?? 0})
                        </button>
                    );
                })}
            </div>
        </div>
    )
}