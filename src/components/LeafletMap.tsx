import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Mine } from '@/data/mineData';
import { Badge } from '@/components/ui/badge';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletMapProps {
  mines: Mine[];
  onMineClick?: (mine: Mine) => void;
  selectedMine?: Mine | null;
}

function createCustomIcon(color: string, isSelected: boolean = false) {
  const size = isSelected ? 16 : 14;
  return new L.DivIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 0 2px ${color}55, 0 2px 4px rgba(0,0,0,0.2);
        ${isSelected ? 'transform: scale(1.2);' : ''}
        transition: transform 0.2s ease;
        cursor: pointer;
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
  });
}

function getRiskColor(riskLevel: string): string {
  switch (riskLevel) {
    case 'Critical': return '#ef4444'; // Red
    case 'High': return '#f59e0b'; // Orange
    case 'Moderate': return '#eab308'; // Yellow
    case 'Low': return '#22c55e'; // Green
    default: return '#22c55e';
  }
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  mines,
  onMineClick,
  selectedMine
}) => {
  const [hoveredMine, setHoveredMine] = useState<Mine | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);

  const markers = useMemo(() =>
    mines.map((mine) => ({
      ...mine,
      color: getRiskColor(mine.riskLevel),
      isSelected: selectedMine?.id === mine.id,
    })),
    [mines, selectedMine]
  );

  return (
    <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden relative">
      <MapContainer
        center={[22.9734, 78.6569] as LatLngExpression}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((mine) => (
          <Marker
            key={mine.id}
            position={[mine.location.lat, mine.location.lng]}
            icon={createCustomIcon(mine.color, mine.isSelected) as L.Icon<L.IconOptions> | L.DivIcon}
            eventHandlers={{
              click: () => onMineClick?.(mine),
              mouseover: (e: L.LeafletMouseEvent) => {
                setHoveredMine(mine);
                const map = e.target._map;
                const point = map.latLngToContainerPoint(e.latlng);
                setHoverPosition({ x: point.x, y: point.y });
              },
              mouseout: () => {
                setHoveredMine(null);
                setHoverPosition(null);
              },
            }}
          >
            <Popup>
              <div className="space-y-2 min-w-[250px] p-2">
                <div className="font-semibold text-lg border-b pb-2 text-center">
                  {mine.name}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Type:</span>
                    <Badge variant="outline" className="text-xs">
                      {mine.type}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Risk Level:</span>
                    <Badge
                      variant={mine.riskLevel === 'Critical' ? 'destructive' :
                             mine.riskLevel === 'High' ? 'secondary' :
                             mine.riskLevel === 'Moderate' ? 'outline' : 'default'}
                      className="text-xs"
                    >
                      {mine.riskLevel}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Status:</span>
                    <span className={`font-medium text-xs px-2 py-1 rounded ${
                      mine.operationalStatus === 'Active' ? 'bg-green-100 text-green-800' :
                      mine.operationalStatus === 'Inactive' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {mine.operationalStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Location:</span>
                    <span className="font-medium text-sm">{mine.location.state}, {mine.location.district}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Production:</span>
                    <span className="font-medium text-sm">{mine.productionVolume} MT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Sensors:</span>
                    <span className="font-medium text-sm">{mine.sensorsOnline}/{mine.totalSensors}</span>
                  </div>
                  {mine.alertsActive > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Active Alerts:</span>
                      <span className="font-medium text-red-600 bg-red-50 px-2 py-1 rounded text-xs">
                        {mine.alertsActive}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Last Update:</span>
                    <span className="font-medium text-sm">{mine.lastUpdate}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Hover Card */}
      {hoveredMine && hoverPosition && (
        <div
          className="absolute z-[1000] pointer-events-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-3 min-w-[200px]"
          style={{
            left: hoverPosition.x + 15,
            top: hoverPosition.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="space-y-2">
            <div className="font-semibold text-sm text-slate-800 dark:text-slate-200 border-b pb-1">
              {hoveredMine.name}
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Type:</span>
                <Badge variant="outline" className="text-xs h-5">
                  {hoveredMine.type}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Risk:</span>
                <Badge
                  variant={hoveredMine.riskLevel === 'Critical' ? 'destructive' :
                         hoveredMine.riskLevel === 'High' ? 'secondary' :
                         hoveredMine.riskLevel === 'Moderate' ? 'outline' : 'default'}
                  className="text-xs h-5"
                >
                  {hoveredMine.riskLevel}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Status:</span>
                <span className={`font-medium text-xs px-2 py-0.5 rounded ${
                  hoveredMine.operationalStatus === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  hoveredMine.operationalStatus === 'Inactive' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {hoveredMine.operationalStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Location:</span>
                <span className="font-medium text-xs">{hoveredMine.location.state}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
        <h4 className="font-semibold text-sm mb-2 text-slate-800 dark:text-slate-200">Risk Levels</h4>
        <div className="space-y-2">
          {[
            { level: 'Critical', color: '#ef4444', desc: 'High Risk' },
            { level: 'High', color: '#f59e0b', desc: 'Elevated Risk' },
            { level: 'Moderate', color: '#eab308', desc: 'Medium Risk' },
            { level: 'Low', color: '#22c55e', desc: 'Low Risk' }
          ].map((risk) => (
            <div key={risk.level} className="flex items-center gap-3 text-xs">
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: risk.color }}
              />
              <div>
                <div className="font-medium text-slate-700 dark:text-slate-300">{risk.level}</div>
                <div className="text-slate-500 dark:text-slate-400">{risk.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mine Counter */}
      <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{mines.length}</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Total Mines</div>
        </div>
      </div>

      {/* Selected Mine Info */}
      {selectedMine && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg max-w-xs">
          <div className="text-center">
            <div className="font-semibold text-slate-800 dark:text-slate-200">{selectedMine.name}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">{selectedMine.location.state}</div>
            <Badge
              variant={selectedMine.riskLevel === 'Critical' ? 'destructive' :
                      selectedMine.riskLevel === 'High' ? 'secondary' :
                      selectedMine.riskLevel === 'Moderate' ? 'outline' : 'default'}
              className="mt-1"
            >
              {selectedMine.riskLevel} Risk
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
