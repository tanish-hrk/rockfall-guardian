import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mine, generateSensorData, generateRockfallEvents } from '@/data/mineData';
import RiskChart from './RiskChart';
import {
  Activity,
  AlertTriangle,
  MapPin,
  Thermometer,
  Zap,
  Calendar,
  TrendingUp,
  Shield,
  Factory
} from 'lucide-react';

interface MineDetailModalProps {
  mine: Mine | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MineDetailModal: React.FC<MineDetailModalProps> = ({ mine, open, onOpenChange }) => {
  if (!mine) return null;

  const sensorData = generateSensorData(mine.id);
  const rockfallEvents = generateRockfallEvents(mine.id);

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'default';
      case 'Moderate': return 'secondary';
      case 'High': return 'destructive';
      case 'Critical': return 'destructive';
      default: return 'outline';
    }
  };

  const chartData = sensorData.map((data, index) => ({
    label: new Date(data.timestamp).getHours() + ':00',
    value: data.displacement
  }));

  const eventData = rockfallEvents.slice(0, 7).map((event, index) => ({
    label: new Date(event.timestamp).toLocaleDateString(),
    value: event.magnitude
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MapPin className="h-5 w-5 text-primary" />
            {mine.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mine Overview */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Factory className="h-4 w-4" />
                  Mine Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Type:</span>
                  <Badge variant="outline">{mine.type}</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Risk Level:</span>
                  <Badge variant={getRiskBadgeVariant(mine.riskLevel)}>
                    {mine.riskLevel}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={mine.operationalStatus === 'Active' ? 'default' : 'secondary'}>
                    {mine.operationalStatus}
                  </Badge>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{mine.location.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">District:</span>
                    <span className="font-medium">{mine.location.district}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Production:</span>
                    <span className="font-medium">{mine.productionVolume}M tonnes</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sensor Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Sensor Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Online:</span>
                  <span className="font-medium text-accent">{mine.sensorsOnline}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="font-medium">{mine.totalSensors}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Health:</span>
                  <span className="font-medium">
                    {Math.round((mine.sensorsOnline / mine.totalSensors) * 100)}%
                  </span>
                </div>
                
                {mine.alertsActive > 0 && (
                  <>
                    <Separator />
                    <div className="flex justify-between items-center text-destructive">
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Active Alerts:
                      </span>
                      <span className="font-medium">{mine.alertsActive}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Recent Sensor Readings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  Latest Readings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Displacement:</span>
                  <span className="font-medium">{sensorData[sensorData.length - 1]?.displacement.toFixed(2)} mm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Temperature:</span>
                  <span className="font-medium">{sensorData[sensorData.length - 1]?.temperature.toFixed(1)}°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Vibration:</span>
                  <span className="font-medium">{sensorData[sensorData.length - 1]?.vibration.toFixed(2)} Hz</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Moisture:</span>
                  <span className="font-medium">{sensorData[sensorData.length - 1]?.moisture.toFixed(1)}%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Analytics */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RiskChart
                data={chartData}
                type="line"
                title="Displacement Trend (24h)"
              />
              <RiskChart
                data={eventData}
                type="bar"
                title="Rockfall Events (7 days)"
              />
            </div>

            {/* Recent Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Recent Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {rockfallEvents.slice(0, 8).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor:
                              event.riskLevel === 'Critical' ? '#ef4444' :
                              event.riskLevel === 'High' ? '#f97316' :
                              event.riskLevel === 'Moderate' ? '#f59e0b' : '#10b981'
                          }}
                        />
                        <div>
                          <div className="font-medium text-sm">
                            {event.riskLevel} Risk Event
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(event.timestamp).toLocaleDateString()} • {event.predictedBy}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">Mag: {event.magnitude.toFixed(1)}</div>
                        <div className="text-xs text-muted-foreground">{event.volume.toFixed(0)}m³</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Prediction Summary */}
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  AI Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {mine.riskLevel === 'Critical' ? '87%' : 
                       mine.riskLevel === 'High' ? '65%' :
                       mine.riskLevel === 'Moderate' ? '34%' : '12%'}
                    </div>
                    <div className="text-sm text-muted-foreground">Risk Probability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {mine.riskLevel === 'Critical' ? '2-4h' : 
                       mine.riskLevel === 'High' ? '6-12h' :
                       mine.riskLevel === 'Moderate' ? '1-2d' : '7d+'}
                    </div>
                    <div className="text-sm text-muted-foreground">Prediction Window</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round((mine.sensorsOnline / mine.totalSensors) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Model Confidence</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MineDetailModal;