import React from 'react';
import { minesData, Mine, getRiskColor } from '@/data/mineData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Activity, MapPin } from 'lucide-react';

interface SimpleMapProps {
  onMineClick: (mine: Mine) => void;
  selectedMine?: Mine | null;
}

const SimpleMap: React.FC<SimpleMapProps> = ({ onMineClick, selectedMine }) => {
  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'default';
      case 'Moderate': return 'secondary';
      case 'High': return 'destructive';
      case 'Critical': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-900 dark:to-slate-800 rounded-lg border border-border shadow-mining overflow-hidden">
      {/* India Map SVG */}
      <div className="absolute inset-0 p-8">
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
        >
          {/* Simplified India outline */}
          <path
            d="M150 150 Q200 100 300 120 Q400 110 500 130 Q600 140 700 160 Q750 180 800 220 Q850 260 870 320 Q880 380 860 440 Q840 480 800 520 Q750 540 700 530 Q650 520 600 510 Q550 500 500 490 Q450 480 400 470 Q350 460 300 450 Q250 440 200 420 Q150 400 120 360 Q100 320 110 280 Q120 240 130 200 Q140 170 150 150 Z"
            fill="hsl(var(--accent) / 0.2)"
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
          
          {/* Mine markers */}
          {minesData.map((mine, index) => {
            // Convert lat/lng to SVG coordinates (approximation for India)
            const x = 150 + (mine.location.lng - 68) * 8; // Rough conversion
            const y = 150 + (35 - mine.location.lat) * 12; // Rough conversion
            const radius = mine.riskLevel === 'Critical' ? 12 : mine.riskLevel === 'High' ? 10 : 8;
            
            return (
              <g key={mine.id}>
                <circle
                  cx={x}
                  cy={y}
                  r={radius}
                  fill={getRiskColor(mine.riskLevel)}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => onMineClick(mine)}
                />
                <text
                  x={x}
                  y={y + radius + 15}
                  textAnchor="middle"
                  className="text-xs font-medium fill-foreground pointer-events-none"
                >
                  {mine.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-mining">
        <h4 className="font-medium text-sm mb-2 text-card-foreground">Risk Levels</h4>
        <div className="space-y-1">
          {['Low', 'Moderate', 'High', 'Critical'].map((level) => (
            <div key={level} className="flex items-center gap-2 text-xs">
              <div
                className="w-3 h-3 rounded-full border border-white"
                style={{ backgroundColor: getRiskColor(level) }}
              />
              <span className="text-muted-foreground">{level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mine cards on hover */}
      <div className="absolute top-4 right-4 space-y-2 max-w-sm">
        {selectedMine && (
          <Card className="border-primary/20 bg-card/95 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {selectedMine.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Risk:</span>
                <Badge variant={getRiskBadgeVariant(selectedMine.riskLevel) as any}>
                  {selectedMine.riskLevel}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Type:</span>
                <Badge variant="outline">{selectedMine.type}</Badge>
              </div>
              {selectedMine.alertsActive > 0 && (
                <div className="flex items-center justify-between text-destructive">
                  <span className="text-sm flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Alerts:
                  </span>
                  <span className="text-sm font-medium">{selectedMine.alertsActive}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SimpleMap;