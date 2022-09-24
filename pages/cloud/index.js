import Navbar from "../../components/navbar"
import axios from "axios"
import Link from "next/link"
import {useEffect, useState} from "react"
import CloudItem from "../../components/CloudItem"
import CloudPublicToggle from "../../components/ClougPublicToggle"

const Cloud = () => {
    const [publicFlights, setPublicFlights] = useState(false)
    const [flights, setFlights] = useState([])

    const getFlights = async() => {
        if(publicFlights) {
            setFlights(await (await axios.get("api/get-flights")).data.flights)
        } else {
            setFlights(await (await axios.get("api/get-flights/1")).data.flights)
        }
    }

    useEffect(() => {
        getFlights()
    }, [publicFlights])

    return (
        <main className="min-w-screen min-h-screen flex flex-col bg-black">
            <Navbar></Navbar>
            <div className="fixed z-0 top-0 left-0 w-screen h-screen overflow-clip">
                <img className="mt-[20vh] w-full h-full object-cover z-0" src="background.png"></img>
            </div>
            
            <CloudPublicToggle publicFlights={publicFlights} setPublicFlights={setPublicFlights}></CloudPublicToggle>

            <div className="grid grid-cols-2 gap-10 mx-auto w-[70vw] mb-20">
                {flights.map((item, index) => {
                    return (
                        <CloudItem item={item} key={index}></CloudItem>
                    )
                })}
            </div>
        </main>
    )
}

export default Cloud