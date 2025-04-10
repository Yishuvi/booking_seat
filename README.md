# Booking Seat

A seat reservation system that allows users to view available seats and reserve them. This project includes both a backend and a frontend.

## Features

- View all available seats.
- Reserve 1 to 7 seats at a time.
- Ensures seats are grouped together when possible.
- Backend API built with Node.js and PostgreSQL.
- Frontend built with modern web technologies.

## Project Structure

```
booking_seat/
├── backend/       # Backend code
│   ├── controllers/  # API controllers
│   ├── utils/        # Utility files (e.g., database connection)
│   └── ...           # Other backend files
├── frontend/      # Frontend code
│   ├── public/       # Static assets
│   ├── src/          # React components and pages
│   └── ...           # Other frontend files
└── .gitignore     # Git ignore file
```

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/booking_seat.git
   cd booking_seat
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up the database:
   - Create a PostgreSQL database.
   - Run the SQL schema to create the `seats` table.
   - Configure the database connection in `backend/utils/db.js`.

4. Create a `.env` file in both `backend` and `frontend` directories:
   - Backend `.env`:
     ```
     DATABASE_URL=your_database_url
     PORT=3000
     ```
   - Frontend `.env`:
     ```
     REACT_APP_API_URL=http://localhost:3000
     ```

## Running the Project

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` for the backend or `http://localhost:3001` for the frontend.

## API Endpoints

### `GET /seats`
- Fetch all seats.

### `POST /seats/reserve`
- Reserve seats.
- Request body:
  ```json
  {
    "count": 3
  }
  ```

## Testing

- Use Postman or cURL to test the API endpoints.
- Run unit tests (if implemented) using:
  ```bash
  npm test
  ```

## License

This project is licensed under the MIT License.