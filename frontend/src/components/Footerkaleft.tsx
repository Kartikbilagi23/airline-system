type Footerkaleftprops={
    title:string,
    subtitle:string
}

const Footerkaleft=({
    title,subtitle
}:Footerkaleftprops)=>{
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
        bg-blue-700
        "
        >
            {/* overlay */}
            {/* <div className="absolute inset-0 bg-black/50"></div> */}
            <div className="absolute p-6 text-white">
                <h2 className="text-3xl font-bold">{title}</h2>
                <p className="mt-2 text-gray-200">{subtitle}</p>
            </div>
        </div>
  )
}

export default Footerkaleft