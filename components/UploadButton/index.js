import {useState, useEffect} from "react"
import axios from "axios"
import ToggleButton from "react-toggle-button"

const UploadButton = ({accData, altData, rollData, velocityData, maxAlt, maxVelocity, maxAcc, timeToApogee}) => {
    const [showModal, setShowModal] = useState(false)
    const [isPrivate, setIsPrivate] = useState(false)

    const submit = async () => {
        let res = await axios.post("api/upload-flight", {
            data: JSON.stringify({
                accData,
                altData,
                rollData,
                velocityData,
                maxAlt,
                maxVelocity,
                maxAcc,
                timeToApogee
            }),
            name: document.getElementById("nameInput").value,
            description: document.getElementById("descriptionInput").value,
            publicFlight: document.getElementById("privateCheckbox").checked
        })
        
        setShowModal(false)
    }
    
    return (
        <>
            <div onClick={()=>{setShowModal(true)}} className="fixed z-100 right-[1vw] bottom-[1vw] w-fit h-16 flex p-2 px-10 bg-[#0f1b32] border-2 border-[#5989C1] rounded-r-full rounded-l-full cursor-pointer transition-all hover:right-[2vw]">
                <p className="whitespace-nowrap my-auto">Upload to Proxima Cloud</p>
            </div>
            {showModal && (
                <div className="fixed top-0 z-30 w-screen h-screen backdrop-blur-lg bg-black/30 flex">
                    <div className="relative w-[40vw] min-h-[40vh] bg-[#0f1b32] text-[#96C6FF] m-auto p-5 rounded-2xl font-[Poppins] flex flex-col">
                        <p className="font-[Audiowide] text-2xl mb-10">Upload to Proxima Cloud</p>
                        <p className="absolute top-5 right-5 font-[Audiowide] cursor-pointer" onClick={()=>{setShowModal(false)}}>X</p>
                        <p>Flight Name:</p>
                        <input id="nameInput" placeholder="Enter flight name" className="mb-10 bg-[#0f1b32] rounded outline outline-1 outline-green-300 text-white mt-2 pl-2 p-2 text-xl"/>
                        <p>Description:</p>
                        <textarea id="descriptionInput" placeholder="Add a description" className="mb-10 bg-[#0f1b32] rounded outline outline-1 outline-green-300 text-white mt-2 pl-2 p-2 text-xl"/>
                        <div className="flex flex-row gap-5">
                            <p>Private:</p>
                            <input type="checkbox" id="privateCheckbox" className="my-auto w-4 h-4"/>
                        </div>
                        
                        <button onClick={submit} className="bg-green-300 text-slate-800 font-[Audiowide] w-fit px-10 py-2 text-xl mx-auto mt-auto rounded-full shadow hover:scale-105 transition-all">Upload</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default UploadButton