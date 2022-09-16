import Navbar from "../../components/navbar"
import {useState, useEffect} from "react"
import DataCard from "../../components/DataCard"
import DataPlot from "../../components/DataPlot"
import { useRouter } from "next/router"
import axios from "axios"

const ExploreCloud = () => {
    const [name, setName] = useState("")
    const [accData, setAccData] = useState([])
    const [altData, setAltData] = useState([])
    const [rollData, setRollData] = useState([])
    const [velocityData, setVelocityData] = useState([])
    const [maxVelocity, setMaxVelocity] = useState(0)
    const [maxAlt, setMaxAlt] = useState(0)
    const [maxAcc, setMaxAcc] = useState(0)
    const [timeToApogee, setTimeToApogee] = useState(0)
    const router = useRouter()
    const {id} = router.query

    async function getData() {
        let res = await axios(`/api/flights/${id}`)
        setName(res.data.flight[0].name)
        let data = JSON.parse(res.data.flight[0].data)
        
        setAccData(data.accData)
        setAltData(data.altData)
        setVelocityData(data.velocityData)
        setRollData(data.rollData)
        setMaxAcc(data.maxAcc)
        setMaxAlt(data.maxAlt)
        setMaxVelocity(data.maxVelocity)
        setTimeToApogee(data.timeToApogee)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <main className="min-w-screen min-h-screen bg-[#040c17] flex flex-col font-[Poppins]">
            <Navbar></Navbar>
            <p className="text-center font-[Audiowide] text-4xl mt-5">{name}</p>
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
        </main>
    )
}

export default ExploreCloud