import Navbar from "../../components/navbar"
import CtaBtn from "../../components/ctabtn"
import {useState, useEffect} from "react"
import DataCard from "../../components/DataCard"
var Serial = require("../../lib/serial")
import DataPlot from "../../components/DataPlot"

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
            tempVelocity.push([item.ts, item.a])

            if(item.alt > tempMaxAlt) tempMaxAlt = item.alt
            if(item.a > tempMaxAcc) tempMaxAcc = item.a
        })

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
    }

    const options = {
        chart: {
            id: "Acceleration"
        },
        dataLabels: {
            enabled: false
        }
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
            <main className="min-w-screen min-h-screen bg-[#040c17] flex flex-col">
                <Navbar></Navbar>
                <div className="flex flex-row gap-10 mx-auto mt-10">
                    <DataCard name="Top Speed" value="120mph"></DataCard>
                    <DataCard name="Max Altitude" value={maxAlt.toLocaleString("en-us") + "m"}></DataCard>
                    <DataCard name="Max Acceleration" value={maxAcc.toLocaleString("en-us", {maximumFractionDigits: 2}) + "m/s²"}></DataCard>
                    <DataCard name="Time to Apogee" value="15sec"></DataCard>
                </div>
                <div className="grid grid-cols-2 gap-10 mx-32 my-10">
                    <DataPlot title="Altitude" series={altData} unit="m"></DataPlot>
                    <DataPlot title="Acceleration" series={accData} unit="m/s²"></DataPlot>
                    <DataPlot title="Roll Rate" series={rollData} unit="deg/s"></DataPlot>
                    <DataPlot title="Velocity" series={velocityData} unit="m/s"></DataPlot>
                </div>
            </main>
        )
    }
}

export default Explore