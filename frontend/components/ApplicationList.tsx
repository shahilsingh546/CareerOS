"use client";

import { useEffect, useState } from "react";
import ApplicationCard from "./ApplicationCard";

async function fetchData() {
    try{
        const res = await fetch("http://localhost:3002/application", {
            method: "GET",
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: "include"
        })
        const data = await res.json();
        if(!res.ok){
            console.log("Data -> ", data)
            console.log("server went down")
        }
        console.log("data -> ", data)
        return data;
    }
    catch(err){
        console.log("Error -> ", err);
        console.error(err);
    }
}

export default function ApplicationList(){
    const[applications, setApplications] = useState<Application []>([]);


    

    useEffect(()=>{
        async function getApplications(){
            const data = await fetchData();
            setApplications(data.applications);
        }
        getApplications();
    },[])

    interface Application{
        id: number,
        companyName: string,
        jobPost: string,
        yoe:string,
        skills:string,
        packageOffer:string,
        notes:string,
        applyDate:string,
        currentStatus:string,
        onDelete: (id:number)=>void
    }
    function onDelete(id:number){
        setApplications((prevApplicatiions)=> (
            prevApplicatiions.filter((item)=>{
                return item.id !== id
            })
        ))
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {/* <Buttons buttonName="Add a application" onClick={openApplicationForm}/> */}
                  {applications.map((application: Application) => (
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
                         onDelete={onDelete}/>
        
        </div>
      ))}
        </div>
    )
}