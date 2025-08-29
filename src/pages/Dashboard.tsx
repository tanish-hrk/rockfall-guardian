import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import SimpleMap from '@/components/SimpleMap';
import MineDetailModal from '@/components/MineDetailModal';
import RiskChart from '@/components/RiskChart';
import { minesData, Mine } from '@/data/mineData';
import {
  Activity,
  AlertTriangle,
  MapPin,
  TrendingUp,
  Shield,
  Zap,
  Factory,
  Bell
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [selectedMine, setSelectedMine] = useState<Mine | null>(null);
  const [showMineDetail, setShowMineDetail] = useState(false);

  const handleMineClick = (mine: Mine) => {
    setSelectedMine(mine);
    setShowMineDetail(true);
  };

  // Calculate overall statistics
  const totalMines = minesData.length;
  const activeMines = minesData.filter(m => m.operationalStatus === 'Active').length;
  const totalAlerts = minesData.reduce((sum, mine) => sum + mine.alertsActive, 0);
  const criticalMines = minesData.filter(m => m.riskLevel === 'Critical').length;
  const highRiskMines = minesData.filter(m => m.riskLevel === 'High').length;

  // Risk distribution data
  const riskDistribution = [
    { label: 'Low', value: minesData.filter(m => m.riskLevel === 'Low').length },
    { label: 'Moderate', value: minesData.filter(m => m.riskLevel === 'Moderate').length },
    { label: 'High', value: highRiskMines },
    { label: 'Critical', value: criticalMines }
  ];

  // Production data
  const productionData = minesData.slice(0, 6).map(mine => ({
    label: mine.name.split(' ')[0],
    value: mine.productionVolume
  }));

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="bg-card/95 backdrop-blur-sm border-b border-border shadow-mining">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Rockfall Prediction Dashboard
              </h1>
              <p className="text-muted-foreground">
                AI-powered monitoring system for open-pit mines
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                System Online
              </Badge>
              {totalAlerts > 0 && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <Bell className="h-3 w-3" />
                  {totalAlerts} Alerts
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Statistics Cards */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Mines</p>
                    <p className="text-2xl font-bold text-primary">{totalMines}</p>
                  </div>
                  <Factory className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Active Operations</p>
                    <p className="text-2xl font-bold text-accent">{activeMines}</p>
                  </div>
                  <Activity className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-destructive/10 to-orange-500/5 border-destructive/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Critical Risk</p>
                    <p className="text-2xl font-bold text-destructive">{criticalMines}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-destructive/5 border-orange-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Active Alerts</p>
                    <p className="text-2xl font-bold text-orange-500">{totalAlerts}</p>
                  </div>
                  <Bell className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Map */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  India Mining Operations Map
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[520px] p-4">
                <SimpleMap 
                  onMineClick={handleMineClick}
                  selectedMine={selectedMine}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with quick stats and controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Risk Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Risk Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {riskDistribution.map((risk) => (
                  <div key={risk.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            risk.label === 'Critical' ? '#ef4444' :
                            risk.label === 'High' ? '#f97316' :
                            risk.label === 'Moderate' ? '#f59e0b' : '#10b981'
                        }}
                      />
                      <span className="text-sm">{risk.label}</span>
                    </div>
                    <Badge variant="outline">{risk.value}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {minesData
                    .filter(mine => mine.alertsActive > 0)
                    .slice(0, 5)
                    .map((mine) => (
                      <div
                        key={mine.id}
                        className="p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => handleMineClick(mine)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{mine.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {mine.location.state} • {mine.alertsActive} alerts
                            </div>
                          </div>
                          <Badge
                            variant={
                              mine.riskLevel === 'Critical' ? 'destructive' :
                              mine.riskLevel === 'High' ? 'destructive' : 'secondary'
                            }
                          >
                            {mine.riskLevel}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">AI Model:</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Data Stream:</span>
                  <Badge variant="default">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Alert System:</span>
                  <Badge variant="default">Operational</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Last Update:</span>
                  <span className="text-xs text-muted-foreground">2 min ago</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <RiskChart
              data={riskDistribution}
              type="bar"
              title="Risk Level Distribution"
            />
            <RiskChart
              data={productionData}
              type="line"
              title="Production Volume (Million Tonnes)"
            />
          </div>
        </div>
      </div>

      {/* Mine Detail Modal */}
      <MineDetailModal
        mine={selectedMine}
        open={showMineDetail}
        onOpenChange={setShowMineDetail}
      />
    </div>
  );
};

export default Dashboard;