# Rockfall Guardian - Local Development Setup

## Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the backend server:
   ```bash
   python run.py
   ```

   The API will be available at: http://localhost:8000

## Frontend Setup

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at: http://localhost:5173

## API Endpoints

- GET `/api/mines` - Get all mines data
- GET `/api/mines/{mine_id}` - Get specific mine data
- GET `/api/dashboard/stats` - Get dashboard statistics
- GET `/api/live-predictions` - Get live risk predictions
- GET `/api/mines/{mine_id}/sensor-data` - Get sensor data for a mine

## CORS Configuration

The backend is configured to allow requests from:
- http://localhost:3000 (React default)
- http://localhost:5173 (Vite default)
- http://localhost:8080 (Alternative port)

## Development Notes

- The backend uses reload mode for automatic restarts on code changes
- All API calls in the frontend are configured for localhost:8000
- Static mine data is used as fallback when JSON files are not available
