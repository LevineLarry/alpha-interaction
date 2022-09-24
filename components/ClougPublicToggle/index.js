import {useState} from "react"

const CloudPublicToggle = ({publicFlights, setPublicFlights}) => {

    return (
        <div onClick={()=>{setPublicFlights(!publicFlights)}} className="flex flex-row w-fit mx-auto my-5 p-2 rounded-lg cloud-public-toggle-bg text-[#6B81AF] font-[Audiowide]">
            <div className={`w-40 py-3 text-center rounded-lg cursor-pointer ${publicFlights ? "cloud-public-toggle-active" : ""}`}>
                <p>Public Flights</p>
            </div>

            <div className={`w-40 py-3 text-center rounded-lg cursor-pointer ${!publicFlights ? "cloud-public-toggle-active" : ""}`}>
                <p>Your Flights</p>
            </div>
        </div>
    )
}

export default CloudPublicToggle