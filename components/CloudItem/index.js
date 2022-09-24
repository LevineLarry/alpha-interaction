import Link from "next/link"

const Stat = ({value, name}) => {
    return (
        <div>
            <p className="font-[Audiowide] text-3xl">{value}</p>
            <p className="font-[Poppins] text-[#96C6FF]">{name}</p>
        </div>
    )    
}

const CloudItem = ({item}) => {
    let data = JSON.parse(item.data)

    return (
        <Link href={`/cloud/${item.id}`}>
            <div className="flex flex-col gap-5 cloud-card-bg p-5 rounded-lg cursor-pointer transition-all hover:scale-105">
                <p className="font-[Audiowide] text-3xl">{item.name}</p>

                <div className="flex flex-row gap-2">
                    <div className="h-16 w-16 bg-slate-200 p-2 rounded-full">
                        <img src={`https://avatars.dicebear.com/api/bottts/${item.creator}.svg`}></img>
                    </div>
                    
                    <div className="flex flex-col">
                        <p className="font-[Audiowide] text-lg mt-auto">Username</p>
                        <p className="mb-auto flex flex-row font-[Poppins] gap-2"><span><img src="./date.png"/></span>19 Sep, 2022</p>
                    </div>
                </div>

                <div>
                    <p className="cloud-item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>

                <div className="bg-white/50 w-full h-[1px]"></div>

                <div className="flex flex-row w-full justify-between">
                    <Stat value={Math.round(data.maxVelocity) + " m/s"} name="Top Speed"></Stat>
                    <div className="w-[1px] bg-white/50 h-[80%]"></div>
                    <Stat value={Math.round(data.maxAlt) + " m"} name="Max Altitude"></Stat>
                    <div className="w-[1px] bg-white/50 h-[80%]"></div>
                    <Stat value={data.maxAcc.toFixed(2) + " m/s²"} name="Peak Acceleration"></Stat>
                </div>
            </div>
        </Link>
    )
}

export default CloudItem