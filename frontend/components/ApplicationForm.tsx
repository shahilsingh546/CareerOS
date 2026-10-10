import { useState } from "react"

export default function ApplicationForm({onCancel,onSubmit}:any) {

    const[formData, setFormData] = useState({
        companyName: "",
        jobPost: "",
        yoe: "",
        skills: "",
        packageOffer: "",
        currentStatus:"",
        notes: ""
    })

    const handleChange = (e:any) => {
        const {name,value} = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit =(e:any) => {
        e.preventDefault();
        console.log("formData -> ", formData)
        onSubmit(formData)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="px-4 mt-6">
                <div className="space-y-6 max-w-md mx-auto">
                    <div className="flex items-center gap-2">
                        <label htmlFor="companyName" className="w-32 text-slate-900 font-medium text-sm inline-block">Company Name</label>
                        <input type="text" id="companyName" name="companyName" placeholder="Amazon" value={formData.companyName} onChange={handleChange} required
                            className="px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-blue-600 outline-none" />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="jobPost"
                            className="w-32 text-slate-900 font-medium text-sm inline-block">Job Post</label>
                        <input type="text" id="jobPost" name="jobPost" placeholder="Software Engineer" value={formData.jobPost} onChange={handleChange} required
                            className="px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-blue-600 outline-none" />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="yoe"
                            className="w-32 text-slate-900 font-medium text-sm inline-block">Years of Experience Required</label>
                        <input type="text" id="yoe" name="yoe" placeholder="2+" value={formData.yoe} onChange={handleChange}
                            className="px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-blue-600 outline-none" />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="skills"
                            className="w-32 text-slate-900 font-medium text-sm inline-block">Skills</label>
                        <input type="text" id="skills" name="skills" placeholder="TypeScript, Express, AWS." value={formData.skills} onChange={handleChange}
                            className="px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-blue-600 outline-none" />
                    </div>

                    <div className="flex items-center gap-2">
                        <label htmlFor="packageOffer"
                            className="w-32 text-slate-900 font-medium text-sm inline-block">Package Offer</label>
                        <input type="text" id="packageOffer" name="packageOffer" placeholder="30 LPA" value={formData.packageOffer} onChange={handleChange}
                            className="px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-blue-600 outline-none" />
                    </div>

                    <div className="flex items-center gap-2">
                        <label htmlFor="currentStatus"
                            className="w-32 text-slate-900 font-medium text-sm inline-block">Current Status</label>
                        <input type="text" id="currentStatus" name="currentStatus" placeholder="APPLIED" list="status-option" value={formData.currentStatus} onChange={handleChange}
                            className="px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-blue-600 outline-none" />
                            <datalist id="status-option">
                                <option value="APPLIED"></option>
                                <option value="OA"></option>
                                <option value="INTERVIEW"></option>
                                <option value="HR"></option>
                                <option value="OFFER"></option>
                                <option value="REJECTED"></option>
                                <option value="WITHDRAWN"></option>
                            </datalist>
                    </div>

                    <div className="flex items-center gap-2">
                        <label htmlFor="notes"
                            className="w-32 text-slate-900 font-medium text-sm inline-block">Notes</label>
                        <input type="text" id="notes" name="notes" placeholder="Currently Applied" value={formData.notes} onChange={handleChange}
                            className="px-1 py-2.5 text-sm text-slate-900 bg-white w-full border-b-2 border-slate-300 focus:border-blue-600 outline-none" />
                    </div>

                    <button type="submit"
                        className="!mt-2 py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Submit</button>

                    <button onClick={onCancel}
                        className="ml-5 !mt-2 py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Cancel</button>     
                </div>
            </form>
        </div>
    )
}