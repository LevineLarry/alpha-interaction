import {useRouter} from "next/router"
import Navbar from "../components/navbar"
import CtaBtn from "../components/ctabtn"

export default function Home() {
    const router = useRouter()

    return (
        <main className="min-w-screen min-h-screen max-h-screen flex flex-col bg-black">
            <Navbar></Navbar>
            <div className="absolute z-0 top-0 left-0 w-screen h-screen overflow-clip">
                <img className="mt-[20vh] w-full h-full object-cover z-0" src="background.png"></img>
            </div>
            
            <p className="font-[Audiowide] text-[#9CC9FF] z-10 text-6xl text-center mt-20">Experience the Future of<br/>Model Rocketry.</p>
            
            <div className="mx-auto mt-64 z-10">
                <CtaBtn text="Get Started" onClick={()=>{router.push("/explore")}}></CtaBtn>
            </div>
        </main>
    )
}