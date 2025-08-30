import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, TrendingUp, AlertTriangle } from 'lucide-react';

interface SensorData {
  timestamp: string;
  ppv: number;
  pwp: number;
  rainfall: number;
  thermal_stress: number;
  cohesion: number;
  friction: number;
  slope_angle: number;
  slope_height: number;
  risk_level: string;
}

interface SensorChartsProps {
  mineId: string;
  mineName: string;
}

const SensorCharts: React.FC<SensorChartsProps> = ({ mineId, mineName }) => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSensorData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/sensor-data/${mineId}`);
      if (!response.ok) throw new Error('Failed to fetch sensor data');
      const data = await response.json();
      setSensorData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [mineId]);

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [fetchSensorData]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <span>Failed to load sensor data: {error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for charts
  const chartData = sensorData.slice(-20).map((data, index) => ({
    time: new Date(data.timestamp).toLocaleTimeString(),
    ppv: data.ppv,
    pwp: data.pwp,
    rainfall: data.rainfall,
    thermal: data.thermal_stress,
    risk: data.risk_level === 'High' || data.risk_level === 'Critical' ? 1 : 0
  }));

  const latestData = sensorData[sensorData.length - 1];

  return (
    <div className="space-y-6">
      {/* Current Sensor Readings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Current Sensor Readings - {mineName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{latestData?.ppv?.toFixed(2) || 'N/A'}</div>
              <div className="text-sm text-blue-600/70">PPV (mm/s)</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{latestData?.pwp?.toFixed(2) || 'N/A'}</div>
              <div className="text-sm text-green-600/70">PWP (kPa)</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{latestData?.rainfall?.toFixed(1) || 'N/A'}</div>
              <div className="text-sm text-purple-600/70">Rainfall (mm)</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{latestData?.thermal_stress?.toFixed(2) || 'N/A'}</div>
              <div className="text-sm text-orange-600/70">Thermal (°C)</div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-sm text-gray-600">Risk Level:</span>
            <Badge variant={latestData?.risk_level === 'Critical' ? 'destructive' :
                          latestData?.risk_level === 'High' ? 'secondary' : 'default'}>
              {latestData?.risk_level || 'Unknown'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* PPV Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            PPV Trend (Peak Particle Velocity)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="ppv"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: '#2563eb' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* PWP and Rainfall Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            PWP & Rainfall Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="pwp"
                stackId="1"
                stroke="#16a34a"
                fill="#16a34a"
                fillOpacity={0.6}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="rainfall"
                stackId="2"
                stroke="#9333ea"
                fill="#9333ea"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Thermal Stress Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            Thermal Stress Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="thermal"
                stroke="#ea580c"
                strokeWidth={2}
                dot={{ fill: '#ea580c' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensorCharts;
