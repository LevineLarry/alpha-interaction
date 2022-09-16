import Navbar from "../../components/navbar"
import axios from "axios"
import Link from "next/link"
import {useEffect, useState} from "react"

const Cloud = () => {
    const [flights, setFlights] = useState([])

    const getFlights = async() => {
        setFlights(await (await axios.get("api/get-flights")).data.flights)
    }

    useEffect(() => {
        getFlights()
    }, [])

    return (
        <main className="min-w-screen min-h-screen max-h-screen flex flex-col bg-black">
            <Navbar></Navbar>
            <div className="absolute z-0 top-0 left-0 w-screen h-screen overflow-clip">
                <img className="mt-[20vh] w-full h-full object-cover z-0" src="background.png"></img>
            </div>
            
            <p className="font-[Audiowide] text-[#9CC9FF] z-10 text-6xl  ml-10 mt-10 mb-20">Previous Flights:</p>

            <div className="grid grid-cols-4 gap-10 mx-10">
                {flights.map((item, index) => {
                    console.log(item)
                    return (
                        <Link href={`/cloud/${item.id}`}>
                            <div key={index} className="backdrop-blur-md bg-white/5 border rounded-lg border-white/20 text-center p-5 cursor-pointer transition-all hover:scale-105 hover:bg-white/10">
                                <p className="font-[Poppins] text-xl">{item.name}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </main>
    )
}

export default Cloud