const CtaBtn = ({text, onClick}) => {
    return (
        <div style={{boxShadow: "inset 4px 6px 12px rgba(150, 198, 255, 0.29)"}} className="z-10 bg-black p-3 px-16 rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer">
            <p className='font-["poppins"] text-[#96C6FF] text-xl'>{text}</p>
        </div>
    )
}

export default CtaBtn