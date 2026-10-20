"use client";

import ApplicationCard from "./ApplicationCard";
import { useApplication } from "./ApplicationsContext";
import type { Application } from "./ApplicationsContext";


export default function ApplicationList() {
    const { applications, removeApplication, selectedStatus } = useApplication();
    function onDelete(id: number) {
        removeApplication(id);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {applications.map((application: Application) => {
                if(selectedStatus !== 'ALL' && application.currentStatus !== selectedStatus){
                    return null
                }
                return (
                    <div key={application.id}>
                        <ApplicationCard id={application.id}
                            companyName={application.companyName}
                            jobPost={application.jobPost}
                            yoe={application.yoe}
                            skills={application.skills}
                            packageOffer={application.packageOffer}
                            applyDate={application.applyDate}
                            currentStatus={application.currentStatus}
                            notes={application.notes}
                            onDelete={onDelete} />

                    </div>
                )
            })}
        </div>
    )
}