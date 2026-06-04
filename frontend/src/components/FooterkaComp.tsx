type Footerkacomprops={
    title:string,
    subtitle:string
}

const Footerkacomp=({
    title,subtitle
}:Footerkacomprops)=>{
  return (
        <div
        className="
        relative
        h-[320px]
        rounded-3xl
        overflow-hidden
        cursor-pointer
        hover:scale-[1.02]
        transition
        duration-300
        bg-white border-4
        border-indigo-800
        "
        >
            {/* overlay */}
            <div className="absolute inset-0 bg-white/50"></div>
            <div className="absolute p-6 text-black">
                <h2 className="text-3xl font-bold">{title}</h2>
                <p className="mt-2 text-gray-500">{subtitle}</p>
            </div>
        </div>
  )
}

export default Footerkacomp