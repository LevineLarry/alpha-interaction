import Navbar from "../../components/navbar"
import CtaBtn from "../../components/ctabtn"
import {useState, useEffect} from "react"
import DataCard from "../../components/DataCard"
var Serial = require("../../lib/serial")
import DataPlot from "../../components/DataPlot"
import UploadButton from "../../components/UploadButton"

const Explore = () => {
    const [data, setData] = useState([])
    const [accData, setAccData] = useState([])
    const [altData, setAltData] = useState([])
    const [rollData, setRollData] = useState([])
    const [velocityData, setVelocityData] = useState([])
    const [maxVelocity, setMaxVelocity] = useState(0)
    const [maxAlt, setMaxAlt] = useState(0)
    const [maxAcc, setMaxAcc] = useState(0)
    const [timeToApogee, setTimeToApogee] = useState(0)

    async function getData() {
        let temp = await Serial.getData()
        console.log(temp)
        setData(temp)

        let tempAcc = []
        let tempAlt = []
        let tempRoll = []
        let tempVelocity = []

        let tempMaxV = 0, tempMaxAlt = 0, tempMaxAcc = 0, tempTimeToApogee = 0

        temp.forEach(item => {
            tempAcc.push([item.ts, item.a])
            tempAlt.push([item.ts, item.alt])
            tempRoll.push([item.ts, item.g])

            if(item.alt > tempMaxAlt) tempMaxAlt = item.alt
            if(item.a > tempMaxAcc) tempMaxAcc = item.a
        })

        //Velocity from derivative of altitude
        let v = 0;
        let maxV = 0;
        let dataLength = temp.length
        
        let lastAlt = null
        let lastTime = null
        tempAlt.forEach(point => {
            let d_alt = 0
            let v = 0
            let dt = 0

            if(lastAlt == null) {
                lastAlt = point[1]
                d_alt = 0
                lastTime = 0
                dt = 0
            } else {
                d_alt = point[1] - lastAlt
                lastAlt = point[1]
                dt = point[0] - lastTime
                lastTime = point[0]
                v = d_alt / dt
            }

            tempVelocity.push([lastTime, v])
        })

        /*
        for(let i = 1; i < dataLength; i++) {
            v += (tempAlt[i][1] - tempAlt[i-1][1]) / (tempAlt[i][0] - tempAlt[i-1][0])

            if(Math.abs(v) > maxV) maxV = Math.abs(v)

            if(i==0) tempVelocity.push([0, 0])
            else tempVelocity.push([tempAlt[i][0], v]) 
        }
        */

        setAccData([{
            name: "Acceleration",
            data: tempAcc
        }])
        setAltData([{
            name: "Altitude",
            data: tempAlt
        }])
        setRollData([{
            name: "Roll Rate",
            data: tempRoll
        }])
        setVelocityData([{
            name: "Velocity",
            data: tempVelocity
        }])

        setMaxAcc(tempMaxAcc)
        setMaxAlt(tempMaxAlt)
        setMaxVelocity(maxV)
        setTimeToApogee(15)
    }

    if(data.length == 0) {
        return (
            <main className="min-w-screen min-h-screen flex flex-col">
                <Navbar></Navbar>
                <div className="absolute z-0 top-0 left-0 w-screen h-screen overflow-clip">
                    <img className="mt-[20vh] w-full h-full object-cover z-0" src="background.png"></img>
                </div>
    
                <div className="mx-auto my-auto z-10 flex flex-col gap-10">
                    <p className="text-xl font-[Poppins]">Connect your flight computer to get started.</p>
                    <CtaBtn text="Connect" className="mx-auto" onClick={getData}></CtaBtn>
                </div>
            </main>
        )
    } else {
        return (
            <main className="min-w-screen min-h-screen bg-[#040c17] flex flex-col font-[Poppins]">
                <Navbar></Navbar>
                <div className="flex flex-row gap-10 mx-auto mt-10">
                    <DataCard name="Top Speed" value={maxVelocity.toLocaleString("en-us") + "m/s"}></DataCard>
                    <DataCard name="Max Altitude" value={maxAlt.toLocaleString("en-us") + "m"}></DataCard>
                    <DataCard name="Max Acceleration" value={maxAcc.toLocaleString("en-us", {maximumFractionDigits: 2}) + "m/s²"}></DataCard>
                    <DataCard name="Time to Apogee" value={timeToApogee + "sec"}></DataCard>
                </div>
                <div className="grid grid-cols-2 gap-10 mx-32 mt-10 mb-20">
                    <DataPlot title="Altitude" series={altData} unit="m"></DataPlot>
                    <DataPlot title="Acceleration" series={accData} unit="m/s²"></DataPlot>
                    <DataPlot title="Roll Rate" series={rollData} unit="deg/s"></DataPlot>
                    <DataPlot title="Velocity" series={velocityData} unit="m/s"></DataPlot>
                </div>
                <UploadButton accData={accData} altData={altData} rollData={rollData} velocityData={velocityData} maxAlt={maxAlt} maxVelocity={maxVelocity} maxAcc={maxAcc} timeToApogee={timeToApogee}></UploadButton>
            </main>
        )
    }
}

export default Explore