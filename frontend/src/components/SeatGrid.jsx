// components/SeatGrid.jsx
export default function SeatGrid({ seats }) {
    if (!seats || !Array.isArray(seats) || seats.length === 0) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="grid grid-cols-7 gap-2 max-w-xl mx-auto">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`w-10 h-10 flex items-center justify-center rounded text-white font-semibold ${
              seat.is_booked ? 'bg-yellow-500' : 'bg-green-600'
            }`}
          >
            {seat.seat_number}
          </div>
        ))}
      </div>
    );
  }