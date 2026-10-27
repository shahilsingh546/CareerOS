"use client";

import { useEffect, useState } from "react";
import Buttons from "./button";
import ApplicationForm from "./ApplicationForm";
import { useApplication } from "./ApplicationsContext";

export default function User({}) {
    const {addApplication} = useApplication();
    const [user, setUser] = useState("")
    const [showApplicationForm, setshowApplicationForm] = useState(false)

    function openApplicationForm() {
        setshowApplicationForm(true)
    }

    function closeApplicationForm() {
        setshowApplicationForm(false)
    }


    async function createApplication(formData: any) {
        console.log("formData-> ", formData)
        try {
            const res = await fetch(`http://localhost:3002/application`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                "credentials": "include",
                body: JSON.stringify(formData)
            })
            if (!res.ok) {
                alert("form not submitted try again")
            }
            const data = await res.json();
            const newApplication = data.Application;
            console.log("Application response -> ", data)
            console.log("applcations->  ", data.Application)
            addApplication(newApplication);
        }
        catch (e) {
            alert("form not submitted, something wrong")
        }
        closeApplicationForm();
    }
    async function userInfo() {
        try {
            const res = await fetch("http://localhost:3002/auth/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            console.log("user data -> ", data)
            if (!data) {
                console.log("data not found-> ", data)
                return []
            }
            return data
        }
        catch (err) {
            console.log(err);
            return []
        }
    }

    useEffect(() => {
        async function getUserData() {
            const userData = await userInfo();
            setUser(userData.user.name)
        }
        getUserData()
    }, [])

    // if (showApplicationForm) {
    //     return <ApplicationForm onCancel={closeApplicationForm} onSubmit={createApplication} />
    // }

    // return (
    //     <div className="flex justify-between items-end gap-4 px-4 flex-wrap">
    //         <div>
    //             <h1 className="text-[clamp(28px,3.6vw,40px)]">Hi {user}, here's where your search stands</h1>
    //             <p className="mt-2 text-[color:var(--muted)]">Keep track of every job you've applied to in one place.</p>
    //         </div>
    //         <Buttons buttonName="Add application" onClick={openApplicationForm} />
    //     </div>
    // )
    return (
    <>
        <div className="flex justify-between items-end gap-4 px-4 flex-wrap">
            <div>
                <h1 className="text-[clamp(28px,3.6vw,40px)]">
                    Hi {user}, here's where your search stands
                </h1>

                <p className="mt-2 text-[color:var(--muted)]">
                    Keep track of every job you've applied to in one place.
                </p>
            </div>

            <Buttons
                buttonName="Add application"
                onClick={openApplicationForm}
            />
        </div>

        {showApplicationForm && (
            <ApplicationForm
                onCancel={closeApplicationForm}
                onSubmit={createApplication}
            />
        )}
    </>
);
}