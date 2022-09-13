const DataCard = ({name, value}) => {
    return (
        <div className="data-card-border w-[20vw] h-[8vw] flex rounded-xl p-[1px]">
            <div className="data-card-bg w-full h-full flex flex-col rounded-xl">
                <div className="m-auto">
                    <p className="font-[Audiowide] text-[#96C6FF] text-4xl">{value}</p>
                    <p className="font-[Poppins] text-[#5989C1] text-xl">{name}</p>
                </div>
            </div>
        </div>
    )
}

export default DataCard