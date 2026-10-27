import { useState } from "react"
import { createPortal } from "react-dom";

export default function ApplicationForm({ onCancel, onSubmit }: any) {

    const [formData, setFormData] = useState({
        companyName: "",
        jobPost: "",
        yoe: "",
        skills: "",
        packageOffer: "",
        currentStatus: "",
        notes: ""
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("formData -> ", formData)
        onSubmit(formData)
    }

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4">

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="application-modal-title"
                className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2
                        id="application-modal-title"
                        className="text-xl font-semibold text-slate-900"
                    >
                        Add New Application
                    </h2>

                    <button
                        type="button"
                        onClick={onCancel}
                        aria-label="Close application form"
                        className="text-slate-500 hover:text-slate-900"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
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

                            {/* <button type="submit"
                        className="!mt-2 py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Submit</button>

                    <button onClick={onCancel}
                        className="ml-5 !mt-2 py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Cancel</button>      */}
                        </div>

                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="rounded-md border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Save Application
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}