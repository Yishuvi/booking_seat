import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numSeats, setNumSeats] = useState('');
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Redirect to login if there's no token
  useEffect(() => {
    if (!token) router.push("/login");
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/seats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSeats(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching seats:", error);
      setLoading(false);
    }
  };

  const toggleSeat = (seatNo) => {
    if (selectedSeats.includes(seatNo)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNo));
    } else {
      if (selectedSeats.length < 7) {
        setSelectedSeats([...selectedSeats, seatNo]);
      }
    }
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) return alert("Select at least one seat");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/seats/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ seats: selectedSeats }),
      });
      const data = await res.json();
      alert(data.message || data.error);
      setSelectedSeats([]);
      fetchSeats(); // Refresh seats after booking
    } catch (err) {
      alert(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    const confirm = window.confirm("Are you sure you want to reset all bookings?");
    if (!confirm) return;
    setLoading(true);
    try {
      await fetch("http://localhost:3000/api/reset", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSeats(); // Reset seat data
      setSelectedSeats([]);
    } catch (err) {
      console.error("Reset failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Seat Booking</h1>

      <div className="mb-4 text-center">
        <input
          type="number"
          placeholder="Enter number of seats"
          className="border px-3 py-2 mr-2 rounded"
          value={numSeats}
          onChange={(e) => setNumSeats(e.target.value)}
        />
        <button
          onClick={handleBooking}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Book
        </button>
        <button
          onClick={handleReset}
          className="bg-cyan-600 text-white px-4 py-2 rounded"
        >
          Reset Booking
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {Array.from({ length: 12 }).map((_, rowIndex) => {
            const start = rowIndex * 7 + 1;
            let end = start + 6;
            if (rowIndex === 11) end = 80; // Last row should have 3 seats

            return (
              <div key={rowIndex} className="flex gap-2 mb-4">
                {Array.from({ length: end - start + 1 }).map((_, i) => {
                  const seatNo = start + i;
                  const seat = seats.find((s) => s.seat_no === seatNo);
                  const isBooked = seat?.status === "booked";
                  const isSelected = selectedSeats.includes(seatNo);

                  return (
                    <button
                      key={seatNo}
                      onClick={() => !isBooked && toggleSeat(seatNo)}
                      className={`w-10 h-10 rounded-full text-sm font-semibold border
                        ${isBooked ? "bg-red-500 text-white cursor-not-allowed" :
                        isSelected ? "bg-green-500 text-white" : "bg-gray-200"}`}
                    >
                      {seatNo}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handleBooking}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Booking..." : "Book Seats"}
        </button>
        <button
          onClick={handleReset}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Reset All
        </button>
      </div>
    </div>
  );
}
