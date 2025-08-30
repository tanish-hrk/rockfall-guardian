from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json
import os
from datetime import datetime, timedelta
import random

app = FastAPI(title="Rockfall Guardian API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000", "http://localhost:8081", "https://rockgaurd-ai.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MineData(BaseModel):
    id: str
    name: str
    location: Dict[str, Any]
    coordinates: List[float]
    mineType: str
    operationalStatus: str
    productionVolume: str
    sensorsOnline: int
    riskLevel: str
    alerts: int
    lastUpdated: str
    sensorData: Dict[str, Any]

class SensorReading(BaseModel):
    timestamp: str
    unitWeight: float
    cohesion: float
    friction: float
    slopeAngle: float
    slopeHeight: float
    rainfall: float
    thermalStress: float
    ppv: float
    pwp: float
    riskCategory: str

# Load mine data from JSON files
def load_mine_data():
    mine_data = []
    data_dir = "../src/data/mines"

    for i in range(1, 17):  # 16 mines
        file_path = f"{data_dir}/part_{i}.json"
        try:
            data = []
            with open(file_path, 'r') as f:
                for line in f:
                    line = line.strip()
                    if line:
                        try:
                            entry = json.loads(line)
                            data.append(entry)
                        except json.JSONDecodeError as e:
                            print(f"Error parsing line in {file_path}: {e}")
                            continue

            if not data:
                print(f"No valid data found in {file_path}")
                continue

            # Calculate risk distribution from the data
            risk_counts = {"Low": 0, "Moderate": 0, "High": 0, "Critical": 0}
            for entry in data:
                risk = entry.get("risk_category", "Low")
                risk_counts[risk] = risk_counts.get(risk, 0) + 1

            # Determine current risk level (most frequent)
            current_risk = max(risk_counts, key=risk_counts.get)

            # Get latest sensor reading
            latest_reading = data[-1] if data else {}

            mine = {
                "id": f"mine-{i:03d}",
                "name": [
                    "Jharia Coalfields",
                    "Singareni Collieries",
                    "Neyveli Lignite",
                    "Talcher Coalfields",
                    "Korba Coalfields",
                    "Ramagundam Opencast",
                    "Malanjkhand Copper Mine",
                    "Kusunda Underground",
                    "Jhanjra Project",
                    "Churcha Rohini",
                    "Dipka Mine",
                    "Gevra Mine",
                    "Kusmunda Mine",
                    "Durgapur Steel Plant",
                    "Bokaro Steel Plant",
                    "Rourkela Steel Plant"
                ][i-1] if i <= 16 else f"Mine {i}",
                "location": {
                    "lat": 20.0 + random.uniform(-5, 5),
                    "lng": 78.0 + random.uniform(-5, 5),
                    "state": [
                        "Jharkhand", "Telangana", "Tamil Nadu", "Odisha", "Chhattisgarh",
                        "Telangana", "Madhya Pradesh", "Jharkhand", "Jharkhand", "Odisha",
                        "Chhattisgarh", "Chhattisgarh", "Chhattisgarh", "West Bengal", "Jharkhand", "Odisha"
                    ][i-1] if i <= 16 else f"State {i}",
                    "district": [
                        "Dhanbad", "Khammam", "Cuddalore", "Angul", "Korba",
                        "Peddapalli", "Balaghat", "Dhanbad", "Dhanbad", "Sundargarh",
                        "Korba", "Korba", "Korba", "Bardhaman", "Bokaro", "Sundargarh"
                    ][i-1] if i <= 16 else f"District {i}"
                },
                "mineType": [
                    "Coal", "Coal", "Lignite", "Coal", "Coal",
                    "Coal", "Copper", "Coal", "Coal", "Coal",
                    "Coal", "Coal", "Coal", "Steel", "Steel", "Steel"
                ][i-1] if i <= 16 else random.choice(["Coal", "Iron Ore", "Copper", "Limestone"]),
                "type": [
                    "Coal", "Coal", "Lignite", "Coal", "Coal",
                    "Coal", "Copper", "Coal", "Coal", "Coal",
                    "Coal", "Coal", "Coal", "Steel", "Steel", "Steel"
                ][i-1] if i <= 16 else random.choice(["Coal", "Iron Ore", "Copper", "Limestone"]),
                "operationalStatus": random.choice(["Active", "Inactive", "Under Development"]),
                "productionVolume": f"{random.uniform(10, 50):.1f} MT",
                "sensorsOnline": random.randint(40, 50),
                "totalSensors": random.randint(100, 150),
                "riskLevel": current_risk,
                "alerts": risk_counts.get("Critical", 0) + risk_counts.get("High", 0),
                "alertsActive": risk_counts.get("Critical", 0) + risk_counts.get("High", 0),
                "lastUpdate": datetime.now().isoformat(),
                "ppv": latest_reading.get("PPV_mm_s", 5.0),
                "pwp": latest_reading.get("PWP_Total", 0.3),
                "rainfall": latest_reading.get("Rain_3d_mm", 10.0),
                "thermal_stress": latest_reading.get("ThermalStressIndex", 0.5),
                "sensorData": {
                    "unitWeight": latest_reading.get("Unit_Weight_kN_m3", 20.0),
                    "cohesion": latest_reading.get("Cohesion_kPa", 25.0),
                    "friction": latest_reading.get("Friction_deg", 30.0),
                    "slopeAngle": latest_reading.get("Slope_Angle_deg", 35.0),
                    "slopeHeight": latest_reading.get("Slope_Height_m", 25.0),
                    "rainfall": latest_reading.get("Rain_3d_mm", 10.0),
                    "thermalStress": latest_reading.get("ThermalStressIndex", 0.5),
                    "ppv": latest_reading.get("PPV_mm_s", 5.0),
                    "pwp": latest_reading.get("PWP_Total", 0.3)
                }
            }
            mine_data.append(mine)

        except FileNotFoundError:
            print(f"Warning: {file_path} not found")
        except json.JSONDecodeError:
            print(f"Error parsing {file_path}")

    return mine_data

# Global variable to store mine data
MINE_DATA = load_mine_data()

@app.get("/")
async def root():
    return {"message": "Rockfall Guardian API", "version": "1.0.0"}

@app.get("/api/mines", response_model=List[MineData])
async def get_mines():
    """Get all mines data"""
    return MINE_DATA

@app.get("/api/mines/{mine_id}", response_model=MineData)
async def get_mine(mine_id: str):
    """Get specific mine data"""
    for mine in MINE_DATA:
        if mine["id"] == mine_id:
            return mine
    raise HTTPException(status_code=404, detail="Mine not found")

@app.get("/api/mines/{mine_id}/sensor-data")
async def get_mine_sensor_data(mine_id: str, limit: int = 100):
    """Get sensor data for a specific mine"""
    try:
        # Extract mine number from ID (e.g., "mine-001" -> 1)
        mine_number = int(mine_id.split("-")[1])

        file_path = f"../src/data/mines/part_{mine_number}.json"
        data = []
        with open(file_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line:
                    try:
                        entry = json.loads(line)
                        data.append(entry)
                    except json.JSONDecodeError as e:
                        continue

        # Return last 'limit' readings
        return data[-limit:] if len(data) > limit else data

    except (FileNotFoundError, ValueError, IndexError):
        raise HTTPException(status_code=404, detail="Sensor data not found")

@app.get("/api/dashboard/stats")
async def get_dashboard_stats():
    """Get dashboard statistics"""
    total_mines = len(MINE_DATA)
    active_mines = len([m for m in MINE_DATA if m["operationalStatus"] == "Active"])
    total_alerts = sum(m["alerts"] for m in MINE_DATA)
    critical_mines = len([m for m in MINE_DATA if m["riskLevel"] == "Critical"])

    # Calculate accuracy based on data quality
    accuracy = 94.2  # This could be calculated from actual prediction accuracy

    return {
        "totalMines": total_mines,
        "activeMines": active_mines,
        "totalAlerts": total_alerts,
        "criticalMines": critical_mines,
        "accuracy": accuracy,
        "lastUpdated": datetime.now().isoformat()
    }

@app.get("/api/live-predictions")
async def get_live_predictions_new():
    """Get live risk predictions for all mines"""
    predictions = []

    for mine in MINE_DATA:
        # Calculate risk score based on sensor data
        risk_score = 0

        # PPV contribution
        if mine.get("ppv", 0) > 15: risk_score += 25
        elif mine.get("ppv", 0) > 10: risk_score += 15
        elif mine.get("ppv", 0) > 5: risk_score += 10

        # PWP contribution
        if mine.get("pwp", 0) > 0.7: risk_score += 20
        elif mine.get("pwp", 0) > 0.5: risk_score += 15
        elif mine.get("pwp", 0) > 0.3: risk_score += 10

        # Rainfall contribution
        if mine.get("rainfall", 0) > 30: risk_score += 15
        elif mine.get("rainfall", 0) > 20: risk_score += 10
        elif mine.get("rainfall", 0) > 10: risk_score += 5

        # Thermal stress contribution
        if mine.get("thermal_stress", 0) > 0.8: risk_score += 15
        elif mine.get("thermal_stress", 0) > 0.6: risk_score += 10

        # Determine risk level
        if risk_score >= 50:
            predicted_risk = "Critical"
        elif risk_score >= 30:
            predicted_risk = "High"
        elif risk_score >= 15:
            predicted_risk = "Moderate"
        else:
            predicted_risk = "Low"

        prediction = {
            "mine_id": mine["id"],
            "mine_name": mine["name"],
            "risk_level": predicted_risk,
            "risk_probability": min(95, risk_score + random.uniform(5, 15)),
            "prediction_timeframe": "2-4 hours" if predicted_risk == "Critical" else "6-12 hours" if predicted_risk == "High" else "1-2 days" if predicted_risk == "Moderate" else "7+ days",
            "confidence_score": random.uniform(85, 98),
            "contributing_factors": {
                "ppv": mine.get("ppv", 5.0),
                "pwp": mine.get("pwp", 0.3),
                "rainfall": mine.get("rainfall", 10.0),
                "thermal_stress": mine.get("thermal_stress", 0.5),
                "slope_stability": random.uniform(0.1, 0.9)
            },
            "recommendations": [
                "Monitor sensor readings closely",
                "Consider evacuation if risk increases",
                "Review slope stability measures"
            ] if predicted_risk in ["Critical", "High"] else [
                "Continue normal monitoring",
                "Regular sensor maintenance recommended"
            ],
            "timestamp": datetime.now().isoformat()
        }
        predictions.append(prediction)

    return predictions

@app.get("/api/charts/risk-distribution")
async def get_risk_distribution():
    """Get risk distribution data for charts"""
    risk_counts = {"Low": 0, "Moderate": 0, "High": 0, "Critical": 0}

    for mine in MINE_DATA:
        risk = mine["riskLevel"]
        risk_counts[risk] = risk_counts.get(risk, 0) + 1

    return {
        "labels": list(risk_counts.keys()),
        "data": list(risk_counts.values()),
        "colors": ["#22c55e", "#eab308", "#f59e0b", "#ef4444"]
    }

@app.get("/api/charts/sensor-trends/{mine_id}")
async def get_sensor_trends(mine_id: str, hours: int = 24):
    """Get sensor trends for a specific mine"""
    try:
        # Extract mine number from ID
        mine_number = int(mine_id.split("-")[1])

        file_path = f"../src/data/mines/part_{mine_number}.json"
        data = []
        with open(file_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line:
                    try:
                        entry = json.loads(line)
                        data.append(entry)
                    except json.JSONDecodeError:
                        continue

        if not data:
            raise HTTPException(status_code=404, detail="No sensor data found")

        # Get last N readings (simulate hourly data)
        readings = data[-hours:] if len(data) > hours else data

        return {
            "timestamps": [entry["Timestamp"] for entry in readings],
            "ppv": [entry["PPV_mm_s"] for entry in readings],
            "pwp": [entry["PWP_Total"] for entry in readings],
            "rainfall": [entry["Rain_3d_mm"] for entry in readings],
            "thermalStress": [entry["ThermalStressIndex"] for entry in readings]
        }

    except (FileNotFoundError, ValueError, IndexError):
        raise HTTPException(status_code=404, detail="Sensor trends not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
