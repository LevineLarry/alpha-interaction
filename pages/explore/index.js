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

    async function getData() {
        let temp = await Serial.getData()
        console.log(temp)
        setData(temp)

        let tempAcc = []
        let tempAlt = []
        let tempRoll = []
        let tempVelocity = []

        temp.forEach(item => {
            tempAcc.push([item.ts, item.a])
            tempAlt.push([item.ts, item.alt])
            tempRoll.push([item.ts, item.g])
            tempVelocity.push([item.ts, item.a])
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
                    <DataCard name="Max Altitude" value="3,500ft"></DataCard>
                    <DataCard name="Max Acceleration" value="4.2g"></DataCard>
                    <DataCard name="Time to Apogee" value="15sec"></DataCard>
                </div>
                <div className="grid grid-cols-2 gap-10 mx-32 my-10">
                    <DataPlot title="Altitude" series={altData} unit="m"></DataPlot>
                    <DataPlot title="Acceleration" series={accData} unit="m/s^2"></DataPlot>
                    <DataPlot title="Roll Rate" series={rollData} unit="deg/s"></DataPlot>
                    <DataPlot title="Velocity" series={velocityData} unit="m/s"></DataPlot>
                </div>
            </main>
        )
    }
}

export default Explore