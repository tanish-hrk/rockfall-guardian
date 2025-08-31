import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SimpleMap from '@/components/SimpleMap';
import GlobalMap from '@/components/GlobalMap';
import LeafletMap from '@/components/LeafletMap';
import MineDetailModal from '@/components/MineDetailModal';
import RiskChart from '@/components/RiskChart';
import LivePredictions from '@/components/LivePredictions';

interface MineData {
  id: string;
  name: string;
  type: 'Coal' | 'Iron Ore' | 'Bauxite' | 'Copper' | 'Limestone';
  location: {
    lat: number;
    lng: number;
    state: string;
    district: string;
  };
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  operationalStatus: 'Active' | 'Inactive' | 'Under Development';
  sensorsOnline: number;
  totalSensors: number;
  productionVolume: number;
  lastUpdate: string;
  alertsActive: number;
  ppv?: number;
  pwp?: number;
  rainfall?: number;
  thermal_stress?: number;
  last_updated?: string;
}

interface DashboardStats {
  totalMines: number;
  activeMines: number;
  totalAlerts: number;
  criticalMines: number;
}

interface PredictionData {
  mine_id: string;
  mine_name: string;
  risk_level: string;
  risk_probability: number;
  prediction_timeframe: string;
  confidence_score: number;
  contributing_factors: {
    ppv: number;
    pwp: number;
    rainfall: number;
    thermal_stress: number;
    slope_stability: number;
  };
  recommendations: string[];
  timestamp: string;
}
import { minesData, Mine } from '@/data/mineData';
import {
  Activity,
  AlertTriangle,
  MapPin,
  TrendingUp,
  Shield,
  Zap,
  Factory,
  Bell,
  ArrowLeft,
  RefreshCw,
  Settings,
  Download,
  Eye,
  Target,
  Cpu,
  Wifi,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

interface DashboardProps {
  onNavigateToLanding: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToLanding }) => {
  const [selectedMine, setSelectedMine] = useState<Mine | null>(null);
  const [showMineDetail, setShowMineDetail] = useState(false);

  // Real-time data states
  const [realMinesData, setRealMinesData] = useState<MineData[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [livePredictions, setLivePredictions] = useState<PredictionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  // API base URL
  const API_BASE = 'https://rock-server-eight.vercel.app';

  // Fetch functions
  const fetchMinesData = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/mines`);
      const data = await response.json();
      setRealMinesData(data);
    } catch (error) {
      console.error('Error fetching mines data:', error);
      // Fallback to static data
      setRealMinesData(minesData);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/dashboard/stats`);
      const data = await response.json();
      setDashboardStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchLivePredictions = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/live-predictions`);
      const data = await response.json();
      setLivePredictions(data);
      setLastUpdate(new Date().toISOString());
    } catch (error) {
      console.error('Error fetching live predictions:', error);
    }
  };

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchMinesData(),
        fetchDashboardStats(),
        fetchLivePredictions()
      ]);
      setLoading(false);
    };

    loadData();

    // Set up periodic updates every 30 seconds
    const interval = setInterval(() => {
      fetchLivePredictions();
      fetchDashboardStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Manual refresh function
  const handleRefresh = async () => {
    setLoading(true);
    await Promise.all([
      fetchMinesData(),
      fetchDashboardStats(),
      fetchLivePredictions()
    ]);
    setLoading(false);
  };

  // Utility function for risk colors
  const getRiskColor = (riskLevel: string): string => {
    switch (riskLevel) {
      case 'Critical': return '#ef4444'; // Red
      case 'High': return '#f59e0b'; // Orange
      case 'Moderate': return '#eab308'; // Yellow
      case 'Low': return '#22c55e'; // Green
      default: return '#22c55e';
    }
  };

  const handleMineClick = (mine: Mine) => {
    setSelectedMine(mine);
    setShowMineDetail(true);
  };

  // Calculate overall statistics from real data
  const totalMines = dashboardStats?.totalMines || realMinesData.length;
  const activeMines = dashboardStats?.activeMines || realMinesData.filter(m => m.operationalStatus === 'Active').length;
  const totalAlerts = dashboardStats?.totalAlerts || realMinesData.reduce((sum, mine) => sum + (mine.alertsActive || 0), 0);
  const criticalMines = dashboardStats?.criticalMines || realMinesData.filter(m => m.riskLevel === 'Critical').length;
  const highRiskMines = realMinesData.filter(m => m.riskLevel === 'High').length;
  const totalSensors = realMinesData.reduce((sum, mine) => sum + (mine.sensorsOnline || 0), 0);

  // Risk distribution data from real API data
  const riskDistribution = [
    { label: 'Low', value: realMinesData.filter(m => m.riskLevel === 'Low').length, color: '#22c55e' },
    { label: 'Moderate', value: realMinesData.filter(m => m.riskLevel === 'Moderate').length, color: '#f59e0b' },
    { label: 'High', value: realMinesData.filter(m => m.riskLevel === 'High').length, color: '#f97316' },
    { label: 'Critical', value: realMinesData.filter(m => m.riskLevel === 'Critical').length, color: '#ef4444' }
  ];

  // Production data from real mines - sorted by production volume
  const productionData = realMinesData
    .filter(mine => mine.productionVolume && mine.productionVolume > 0)
    .sort((a, b) => (b.productionVolume || 0) - (a.productionVolume || 0))
    .slice(0, 8)
    .map(mine => ({
      label: mine.name.length > 15 ? mine.name.substring(0, 15) + '...' : mine.name,
      value: mine.productionVolume || 0,
      color: mine.type === 'Copper' ? '#f59e0b' : 
             mine.type === 'Coal' ? '#22c55e' : 
             mine.type === 'Iron Ore' ? '#ef4444' :
             mine.type === 'Bauxite' ? '#3b82f6' : '#8b5cf6'
    }));

  const systemMetrics = [
    { label: 'AI Accuracy', value: '84.2%', icon: Target, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Response Time', value: '< 2s', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Uptime', value: '80%', icon: CheckCircle, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Data Points', value: '2.1M', icon: BarChart3, color: 'text-orange-500', bg: 'bg-orange-500/10' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={onNavigateToLanding}>
              <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  RockGuard AI Dashboard
                </h1>
                <div className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Real-time Mining Safety Monitoring
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={onNavigateToLanding} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>

              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">System Online</span>
              </div>

              {totalAlerts > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <Bell className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <span className="text-sm font-medium text-red-700 dark:text-red-300">{totalAlerts} Active Alerts</span>
                </div>
              )}

              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>

              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">Total Mines</p>
                  <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{totalMines}</p>
                  <p className="text-blue-500 dark:text-blue-400 text-xs mt-1">{activeMines} active</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Factory className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 dark:text-green-400 text-sm font-medium mb-1">Active Sensors</p>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-300">{totalSensors}</p>
                  <p className="text-green-500 dark:text-green-400 text-xs mt-1">99.8% uptime</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Wifi className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium mb-1">Critical Risk</p>
                  <p className="text-3xl font-bold text-red-700 dark:text-red-300">{criticalMines}</p>
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">Requires attention</p>
                </div>
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-1">AI Predictions</p>
                  <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">84.2%</p>
                  <p className="text-purple-500 dark:text-purple-400 text-xs mt-1">Accuracy rate</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <Cpu className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    Global Mining Operations
                  </CardTitle>
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                    Live Data
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[500px] rounded-b-lg overflow-hidden relative">
                  <LeafletMap
                    mines={realMinesData.length > 0 ? realMinesData : minesData}
                    onMineClick={handleMineClick}
                    selectedMine={selectedMine}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mine List */}
          <div className="mt-6">
            <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Factory className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  Mine Operations List
                </CardTitle>
                <Badge variant="outline" className="w-fit bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600">
                  {totalMines} Total Mines
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {(realMinesData.length > 0 ? realMinesData : minesData).map((mine) => {
                    const isRealData = 'ppv' in mine;
                    return (
                    <div
                      key={mine.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
                        selectedMine?.id === mine.id
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600 shadow-md'
                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                      }`}
                      onClick={() => handleMineClick(mine)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full shadow-sm"
                            style={{ backgroundColor: getRiskColor(mine.riskLevel) }}
                          />
                          <div className="font-medium text-slate-800 dark:text-slate-200">
                            {mine.name}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {mine.alertsActive > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {mine.alertsActive}
                            </Badge>
                          )}
                          <Badge
                            variant={mine.operationalStatus === 'Active' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {mine.operationalStatus}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                        <span>{mine.type} • {mine.location?.state || 'Unknown'}</span>
                        <span>{mine.sensorsOnline || 0}/{mine.totalSensors || 0} sensors</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-500">PPV:</span>
                          <span className="font-medium">{isRealData ? (mine as MineData).ppv?.toFixed(2) || 'N/A' : 'N/A'} mm/s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-500">PWP:</span>
                          <span className="font-medium">{isRealData ? (mine as MineData).pwp?.toFixed(2) || 'N/A' : 'N/A'} kPa</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-500">Rainfall:</span>
                          <span className="font-medium">{isRealData ? (mine as MineData).rainfall?.toFixed(1) || 'N/A' : 'N/A'} mm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-500">Thermal:</span>
                          <span className="font-medium">{isRealData ? (mine as MineData).thermal_stress?.toFixed(2) || 'N/A' : 'N/A'} °C</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs">
                        <span className="text-slate-500 dark:text-slate-500">
                          Production: {mine.productionVolume ? `${mine.productionVolume} MT` : 'N/A'}
                        </span>
                        <Badge
                          variant={mine.riskLevel === 'Critical' ? 'destructive' :
                                 mine.riskLevel === 'High' ? 'secondary' :
                                 mine.riskLevel === 'Moderate' ? 'outline' : 'default'}
                          className="text-xs"
                        >
                          {mine.riskLevel}
                        </Badge>
                      </div>
                    </div>
                  );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mine List Card - moved to full width below */}
          </div>
        </div>

        {/* Full Width Cards Section */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Risk Distribution */}
            <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Risk Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskDistribution.map((risk) => (
                  <div key={risk.label} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full shadow-sm"
                        style={{ backgroundColor: risk.color }}
                      />
                      <span className="font-medium text-slate-700 dark:text-slate-300">{risk.label}</span>
                    </div>
                    <Badge variant="outline" className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                      {risk.value}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Metrics */}
            <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                  System Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 ${metric.bg} rounded-lg`}>
                        <metric.icon className={`h-4 w-4 ${metric.color}`} />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{metric.label}</span>
                    </div>
                    <span className={`font-bold ${metric.color}`}>{metric.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Active Alerts */}
            <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {minesData
                    .filter(mine => mine.alertsActive > 0)
                    .slice(0, 5)
                    .map((mine) => (
                      <div
                        key={mine.id}
                        className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800"
                        onClick={() => handleMineClick(mine)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-red-800 dark:text-red-200">{mine.name}</div>
                          <Badge variant="destructive" className="text-xs">
                            {mine.alertsActive}
                          </Badge>
                        </div>
                        <div className="text-xs text-red-600 dark:text-red-400">
                          {mine.location.state} • {mine.riskLevel} Risk
                        </div>
                      </div>
                    ))}
                  {minesData.filter(mine => mine.alertsActive > 0).length === 0 && (
                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                      <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
                      <p className="text-sm">All systems normal</p>
                      <p className="text-xs">No active alerts</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Risk Level Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RiskChart
                data={riskDistribution}
                type="bar"
                title=""
              />
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                Production Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RiskChart
                data={productionData}
                type="bar"
                title=""
              />
            </CardContent>
          </Card>
        </div>

        {/* Live Predictions Section */}
        <div className="mt-8">
          <LivePredictions />
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