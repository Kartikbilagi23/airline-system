type PromoCardProps={
    image:string,
    title:string,
    subtitle:string
};

const PromoCard=({
    image,
    title,
    subtitle
}:PromoCardProps)=>{
    return(
        <div
        className="
        relative
        h-[320px]
        rounded-3xl
        overflow-hidden
        shadow-xl
        cursor-pointer
        hover:scale-[1.02]
        transition
        duration-300
        "
        >
            <img src={image} alt="" className="h-full w-full object-cover"/>
            {/* overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute bottom-0 p-6 text-white">
                <h2 className="text-3xl font-bold">{title}</h2>
                <p className="mt-2 text-gray-200">{subtitle}</p>
            </div>
        </div>
    )
}

export default PromoCard