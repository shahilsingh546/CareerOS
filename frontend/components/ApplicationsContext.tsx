"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface Application {
    id: number,
    companyName: string,
    jobPost: string,
    yoe: string,
    skills:string,
    packageOffer:string,
    notes: string,
    applyDate:string,
    currentStatus:string
}

interface ApplicationsContextType{
    applications: Application[],
    addApplication: (application:Application) => void;
    removeApplication: (id:number) => void,
    selectedStatus: string,
    setselectedStatus: (currentStatis:string)=> void;
}

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);

export function ApplicationsProvider({children}: {children:ReactNode}){
    const [applications, setApplications] = useState<Application[]>([]);
    const [selectedStatus, setselectedStatus] = useState("ALL")

    
    useEffect(()=>{
        async function fetchApplication(){
            try{
                const res = await fetch('http://localhost:3002/application',{
                    credentials: "include"
                });
                if(!res.ok){
                    throw new Error("Failed to fetch applications")
                }
                const data = await res.json();
                setApplications(data.applications ?? [])
            }
            catch(e){
                console.error("Error fetching applications: ", e)
            }
        }
        fetchApplication();
    },[])


    function removeApplication(id:number){
        setApplications((previous)=> 
            previous.filter((application)=>application.id !== id))
    }

    function addApplication(applcation:Application){
        setApplications((previous)=> [
            ...previous,
            applcation,
        ]);
    }

    return (
        <ApplicationsContext.Provider
            value={{
                applications,
                addApplication,
                removeApplication,
                selectedStatus,
                setselectedStatus
            }}
        >
            {children}
        </ApplicationsContext.Provider>    
    );
    
}

export function useApplication(){
    const  context = useContext(ApplicationsContext);

    if(!context){
        throw new Error("useApplications must be used inside ApplicationsProvider");
    }
    return context
}