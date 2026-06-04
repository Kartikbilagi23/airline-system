type SeatSelectionProps = {
    selectedSeats: string[];
    setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>

lockedSeats:String[];
bookedSeats:String[];

}
//to pass setter function from parent comp to child



const seats = [
    "A1", "A2", "A3", "A4",
    "B1", "B2", "B3", "B4",
    "C1", "C2", "C3", "C4",
];

const SeatSelection = ({
    selectedSeats,
    setSelectedSeats,
    lockedSeats,
    bookedSeats,
}: SeatSelectionProps) => {
const toggleSeat = (seat: string) => {
    if(lockedSeats.includes(seat)||bookedSeats.includes(seat)){
        return;
    }
    if(selectedSeats.includes(seat)){
        setSelectedSeats(
            selectedSeats.filter((s)=>s!==seat)
        )
    }
    else{
        setSelectedSeats([...selectedSeats,seat])
    }
    
//   setSelectedSeats((prev) =>
//     prev.includes(seat)
//       ? prev.filter((s) => s !== seat)
//       : [...prev, seat]
//   );
};
    return (
        <div className="grid grid-cols-3 gap-4 mt-6">
            {seats.map((seat) => {
                const isSelected = selectedSeats.includes(seat);
                const isBooked=bookedSeats.includes(seat);
                const islocked=lockedSeats.includes(seat);
                const isunavailable=isBooked || islocked;
                return (
                    <button
                        key={seat}
                        onClick={() => toggleSeat(seat)}
                        className={`p-4
                    rounded-xl
                    border border-2 border-gray-200
                    transition
                    font-semibold  
${      isBooked? "bg-red-500 text-white cursor-not-allowed":
    islocked? "bg-gray-400 text-white cursor-not-allowed":
    isSelected ?
    "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
}  
                    `
                        }
                    >{seat}</button>
                )
            })}
        </div>
    )
}

export default SeatSelection;