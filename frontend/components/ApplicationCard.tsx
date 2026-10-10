"use client";

import { useState } from "react";
import Buttons from "./button";

interface Application {
  id: number,
  companyName: string,
  jobPost: string,
  yoe: string,
  skills: string,
  packageOffer: string,
  applyDate: string,
  currentStatus: string,
  notes: string,
  onDelete: (id: number) => void
}
export default function ApplicationCard({ id, companyName, jobPost, yoe, skills, packageOffer, applyDate, currentStatus, notes, onDelete }: Application) {
  const originalData = {
    companyName,
    jobPost,
    yoe,
    skills,
    packageOffer,
    currentStatus,
    applyDate,
    notes
  }
  const [isEditing, setIsEditing] = useState(false);
  const [formData, SetFormData] = useState({
    companyName: companyName,
    jobPost: jobPost,
    yoe: yoe,
    skills: skills,
    packageOffer: packageOffer,
    currentStatus: currentStatus,
    applyDate:applyDate,
    notes: notes
  })

  // -------------------------------
  // # For skills  wrapping in span
  const skillsArray = formData.skills.split(',').map(skill=>skill.trim());
  // for converting applydate into D M YYYY format
  const dateObj = new Date(formData.applyDate)
  const formattedDate = new Intl.DateTimeFormat('en-GB',{
    day:'numeric',
    month: "short",
    year: "numeric"
  }).format(dateObj)
// -----------------------------------------


  async function deleteApplication() {
    try {
      const res = await fetch(`http://localhost:3002/application/${id}`, {
        method: "DELETE",
        "credentials": "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (!res.ok) {
        alert("Please try again to delete the application")
      }
      else {
        const data = await res.json();
        alert("Successfully Deleted")
        onDelete(id)
        console.log("Data -> ", data)
        console.log("data.ok -> ", data.ok)
      }
    }
    catch (e) {
      console.log("something wrong")
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    SetFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSave = async (e: any) => {
    console.log("inside handle save")
    e.preventDefault();
    const changedData: any = {}
    for (const [key, value] of Object.entries(formData)) {
      console.log("inside for")
      console.log("key ->> ", key)
      if (value !== originalData[key as keyof typeof formData]) {
        changedData[key] = value
      }
    }
    try {
      const res = await fetch(`http://localhost:3002/application/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(changedData)
      })
      const data = await res.json();
      console.log("data -> ", data)
    }
    catch (e) {
      console.log("erroor-> ", e)
    }
    setIsEditing(false)
  }
  // Render the Form UI when editing
  if (isEditing) {
    return (
      <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs">
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <input
            className="border p-2 rounded text-heading font-semibold"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
          />
          <input
            className="border p-2 rounded text-body"
            name="jobPost"
            value={formData.jobPost}
            onChange={handleChange}
            placeholder="Job Post"
          />
          <input
            className="border p-2 rounded text-body"
            name="yoe"
            value={formData.yoe}
            onChange={handleChange}
            placeholder="Years of Experience"
          />
          <input
            className="border p-2 rounded text-body"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Skills"
          />
          <input
            className="border p-2 rounded text-body"
            name="packageOffer"
            value={formData.packageOffer}
            onChange={handleChange}
            placeholder="Package Offer"
          />
          <input
            className="border p-2 rounded text-body"
            name="currentStatus"
            value={formData.currentStatus}
            onChange={handleChange}
            placeholder="Status"
          />
          <textarea
            className="border p-2 rounded text-body"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
          />

          <div className="flex gap-2 mt-3">
            <Buttons buttonName="Save" type="submit" />
            <Buttons buttonName="Cancel" onClick={() => setIsEditing(false)} type="button" />
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className="grid grid-col-3 gap-4">
      <article className="flex flex-col gap-3.5 rounded-2xl border border-line bg-surface p-5">
        <div className="flex items-start justify-between gap-2.5">
          <div>
            <h3 className="font-display text-[22px] font-bold leading-[1.1] tracking-tight">{formData.companyName}</h3>
            <div className="text-muted">{formData.jobPost}</div>
          </div>
          <span className="whitespace-nowrap rounded-full bg-chip px-2.5 py-1 text-xs font-bold text-bad">{formData.currentStatus}</span>
        </div>

        <div className="flex gap-[22px]">
          <div>
            <span className="block text-xs text-muted">Salary</span>
            <b className="font-medium">{formData.packageOffer}</b>
          </div>
          <div>
            <span className="block text-xs text-muted">Experience</span>
            <b className="font-medium">{formData.yoe}</b>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {skillsArray.map((skill,index)=>(
            <span
            key={index}
            className="rounded-lg border border-line bg-bg px-2.5 py-0.5 text-[13px]"
            >
              {skill}
            </span>
          ))}
        </div>

        <p className="border-t border-line pt-3 text-sm text-muted">{formData.notes}</p>

        <div className="mt-auto flex items-center justify-between">
          <small className="text-sm text-muted">Applied {formattedDate}</small>
          <div className="flex gap-2">
            <button className="rounded-[10px] border border-line px-[18px] py-2.5 font-bold text-ink cursor-pointer" onClick={()=>{
              setIsEditing(true);
            }}>Edit</button>
            <button className="rounded-[10px] border border-line px-[18px] py-2.5 font-bold text-bad cursor-pointer" onClick={()=>{
              deleteApplication()
            }}>Delete</button>
          </div>
        </div>
      </article>
    </div>
  )
}