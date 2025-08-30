export interface Mine {
  id: string;
  name: string;
  type: 'Coal' | 'Iron Ore' | 'Bauxite' | 'Copper' | 'Limestone';
  location: {
    lat: number;
    lng: number;
    state: string;
    district: string;
  };
  operationalStatus: 'Active' | 'Inactive' | 'Under Development';
  productionVolume: number; // in million tonnes
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  sensorsOnline: number;
  totalSensors: number;
  lastUpdate: string;
  alertsActive: number;
}

export interface SensorData {
  id: string;
  mineId: string;
  timestamp: string;
  displacement: number; // in mm
  temperature: number; // in celsius
  vibration: number; // in Hz
  moisture: number; // in %
  status: 'Online' | 'Offline' | 'Warning';
}

export interface RockfallEvent {
  id: string;
  mineId: string;
  timestamp: string;
  magnitude: number; // 1-10 scale
  volume: number; // cubic meters
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  predictedBy: 'AI' | 'Sensor' | 'Manual';
  resolved: boolean;
}

// Sample mine data based on major Indian mining locations
export const minesData: Mine[] = [
  {
    id: 'mine-001',
    name: 'Jharia Coalfields',
    type: 'Coal',
    location: { lat: 23.7644, lng: 86.4084, state: 'Jharkhand', district: 'Dhanbad' },
    operationalStatus: 'Active',
    productionVolume: 45.2,
    riskLevel: 'High',
    sensorsOnline: 142,
    totalSensors: 150,
    lastUpdate: '2024-01-15T10:30:00Z',
    alertsActive: 3
  },
  {
    id: 'mine-002',
    name: 'Bailadila Iron Ore Mine',
    type: 'Iron Ore',
    location: { lat: 18.6298, lng: 81.2074, state: 'Chhattisgarh', district: 'Dantewada' },
    operationalStatus: 'Active',
    productionVolume: 38.7,
    riskLevel: 'Moderate',
    sensorsOnline: 89,
    totalSensors: 95,
    lastUpdate: '2024-01-15T09:45:00Z',
    alertsActive: 1
  },
  {
    id: 'mine-003',
    name: 'Panchpatmali Bauxite Mine',
    type: 'Bauxite',
    location: { lat: 19.3159, lng: 82.7789, state: 'Odisha', district: 'Koraput' },
    operationalStatus: 'Active',
    productionVolume: 12.3,
    riskLevel: 'Low',
    sensorsOnline: 67,
    totalSensors: 70,
    lastUpdate: '2024-01-15T08:20:00Z',
    alertsActive: 0
  },
  {
    id: 'mine-004',
    name: 'Malanjkhand Copper Mine',
    type: 'Copper',
    location: { lat: 22.2587, lng: 80.6947, state: 'Madhya Pradesh', district: 'Balaghat' },
    operationalStatus: 'Active',
    productionVolume: 4.1,
    riskLevel: 'Critical',
    sensorsOnline: 98,
    totalSensors: 120,
    lastUpdate: '2024-01-15T11:15:00Z',
    alertsActive: 7
  },
  {
    id: 'mine-005',
    name: 'Korba Coalfields',
    type: 'Coal',
    location: { lat: 22.3496, lng: 82.7501, state: 'Chhattisgarh', district: 'Korba' },
    operationalStatus: 'Active',
    productionVolume: 52.8,
    riskLevel: 'High',
    sensorsOnline: 134,
    totalSensors: 140,
    lastUpdate: '2024-01-15T10:00:00Z',
    alertsActive: 4
  },
  {
    id: 'mine-006',
    name: 'Barbil Iron Ore Mine',
    type: 'Iron Ore',
    location: { lat: 22.1167, lng: 85.3833, state: 'Odisha', district: 'Keonjhar' },
    operationalStatus: 'Active',
    productionVolume: 28.4,
    riskLevel: 'Moderate',
    sensorsOnline: 76,
    totalSensors: 80,
    lastUpdate: '2024-01-15T09:30:00Z',
    alertsActive: 2
  },
  {
    id: 'mine-007',
    name: 'Jharsuguda Bauxite Mine',
    type: 'Bauxite',
    location: { lat: 21.8558, lng: 84.0060, state: 'Odisha', district: 'Jharsuguda' },
    operationalStatus: 'Under Development',
    productionVolume: 8.9,
    riskLevel: 'Low',
    sensorsOnline: 45,
    totalSensors: 60,
    lastUpdate: '2024-01-15T07:45:00Z',
    alertsActive: 0
  },
  {
    id: 'mine-008',
    name: 'Singrauli Coalfields',
    type: 'Coal',
    location: { lat: 24.1997, lng: 82.6739, state: 'Madhya Pradesh', district: 'Singrauli' },
    operationalStatus: 'Active',
    productionVolume: 41.6,
    riskLevel: 'High',
    sensorsOnline: 118,
    totalSensors: 125,
    lastUpdate: '2024-01-15T10:45:00Z',
    alertsActive: 5
  },
  

  {
    id: 'mine-009',
    name: 'Khetri Copper Mine',
    type: 'Copper',
    location: { lat: 27.9881, lng: 75.7850, state: 'Rajasthan', district: 'Jhunjhunu' },
    operationalStatus: 'Active',
    productionVolume: 3.6,
    riskLevel: 'Moderate',
    sensorsOnline: 82,
    totalSensors: 90,
    lastUpdate: '2024-01-15T11:00:00Z',
    alertsActive: 2
  },
  {
    id: 'mine-010',
    name: 'Chiria Iron Ore Mine',
    type: 'Iron Ore',
    location: { lat: 22.3129, lng: 85.2760, state: 'Jharkhand', district: 'West Singhbhum' },
    operationalStatus: 'Active',
    productionVolume: 30.5,
    riskLevel: 'High',
    sensorsOnline: 101,
    totalSensors: 110,
    lastUpdate: '2024-01-15T10:15:00Z',
    alertsActive: 3
  },
  {
    id: 'mine-011',
    name: 'Majri Open Pit',
    type: 'Coal',
    location: { lat: 20.9400, lng: 78.6200, state: 'Maharashtra', district: 'Nagpur' },
    operationalStatus: 'Active',
    productionVolume: 21.8,
    riskLevel: 'Critical',
    sensorsOnline: 115,
    totalSensors: 130,
    lastUpdate: '2024-01-15T11:30:00Z',
    alertsActive: 6
  },
  {
    id: 'mine-012',
    name: 'Dalli-Rajhara Iron Ore Mine',
    type: 'Iron Ore',
    location: { lat: 20.6000, lng: 81.1000, state: 'Chhattisgarh', district: 'Balod' },
    operationalStatus: 'Active',
    productionVolume: 26.4,
    riskLevel: 'Moderate',
    sensorsOnline: 73,
    totalSensors: 80,
    lastUpdate: '2024-01-15T09:00:00Z',
    alertsActive: 1
  },
  {
    id: 'mine-013',
    name: 'Balaghat Manganese Mine',
    type: 'Iron Ore',
    location: { lat: 21.8000, lng: 80.2000, state: 'Madhya Pradesh', district: 'Balaghat' },
    operationalStatus: 'Active',
    productionVolume: 19.2,
    riskLevel: 'High',
    sensorsOnline: 88,
    totalSensors: 95,
    lastUpdate: '2024-01-15T10:20:00Z',
    alertsActive: 4
  },
  {
    id: 'mine-014',
    name: 'Kudremukh Iron Ore Mine',
    type: 'Iron Ore',
    location: { lat: 13.6000, lng: 75.2500, state: 'Karnataka', district: 'Chikkamagaluru' },
    operationalStatus: 'Inactive',
    productionVolume: 0,
    riskLevel: 'Low',
    sensorsOnline: 0,
    totalSensors: 60,
    lastUpdate: '2024-01-15T06:00:00Z',
    alertsActive: 0
  },
  {
    id: 'mine-015',
    name: 'Panna Diamond Mine',
    type: 'Limestone',
    location: { lat: 24.7200, lng: 80.2000, state: 'Madhya Pradesh', district: 'Panna' },
    operationalStatus: 'Active',
    productionVolume: 2.1,
    riskLevel: 'Low',
    sensorsOnline: 52,
    totalSensors: 60,
    lastUpdate: '2024-01-15T08:45:00Z',
    alertsActive: 0
  },
  {
    id: 'mine-016',
    name: 'Joda Iron Ore Mine',
    type: 'Iron Ore',
    location: { lat: 21.9900, lng: 85.4300, state: 'Odisha', district: 'Keonjhar' },
    operationalStatus: 'Active',
    productionVolume: 22.7,
    riskLevel: 'Moderate',
    sensorsOnline: 79,
    totalSensors: 85,
    lastUpdate: '2024-01-15T09:50:00Z',
    alertsActive: 2
  }

];

// Generate sample sensor data
export const generateSensorData = (mineId: string, count: number = 24): SensorData[] => {
  const data: SensorData[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000)); // hourly data
    data.push({
      id: `sensor-${mineId}-${i}`,
      mineId,
      timestamp: timestamp.toISOString(),
      displacement: Math.random() * 10 + (Math.sin(i * 0.1) * 2),
      temperature: 25 + Math.random() * 15,
      vibration: Math.random() * 5 + 1,
      moisture: Math.random() * 20 + 40,
      status: Math.random() > 0.9 ? 'Warning' : 'Online'
    });
  }
  
  return data.reverse();
};

// Generate sample rockfall events
export const generateRockfallEvents = (mineId: string, days: number = 7): RockfallEvent[] => {
  const events: RockfallEvent[] = [];
  const now = new Date();
  const mine = minesData.find(m => m.id === mineId);
  
  const eventCount = mine?.riskLevel === 'Critical' ? 12 : 
                    mine?.riskLevel === 'High' ? 8 :
                    mine?.riskLevel === 'Moderate' ? 4 : 2;
  
  for (let i = 0; i < eventCount; i++) {
    const timestamp = new Date(now.getTime() - Math.random() * days * 24 * 60 * 60 * 1000);
    events.push({
      id: `event-${mineId}-${i}`,
      mineId,
      timestamp: timestamp.toISOString(),
      magnitude: Math.random() * 10,
      volume: Math.random() * 100 + 10,
      riskLevel: ['Low', 'Moderate', 'High', 'Critical'][Math.floor(Math.random() * 4)] as any,
      predictedBy: Math.random() > 0.7 ? 'AI' : Math.random() > 0.5 ? 'Sensor' : 'Manual',
      resolved: Math.random() > 0.3
    });
  }
  
  return events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'Low': return '#10b981'; // emerald-500
    case 'Moderate': return '#f59e0b'; // amber-500  
    case 'High': return '#f97316'; // orange-500
    case 'Critical': return '#ef4444'; // red-500
    default: return '#6b7280'; // gray-500
  }
};

export const getMineTypeColor = (type: string) => {
  switch (type) {
    case 'Coal': return '#374151'; // gray-700
    case 'Iron Ore': return '#dc2626'; // red-600
    case 'Bauxite': return '#d97706'; // amber-600
    case 'Copper': return '#ea580c'; // orange-600
    case 'Limestone': return '#64748b'; // slate-500
    default: return '#6b7280'; // gray-500
  }
};