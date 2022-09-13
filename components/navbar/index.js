const Navbar = () => {
    return (
        <div className="w-full px-36 h-12 z-10 bg-[#0f1b32] flex flex-row justify-between">
            <img className="h-full object-cover" src="logo.png"></img>
            <div className="flex flex-row gap-10">
                <p className="text-white font-[Audiowide] my-auto">Explore</p>
                <p className="text-white font-[Audiowide] my-auto">Store</p>
            </div>
        </div>
    )
}

export default Navbar