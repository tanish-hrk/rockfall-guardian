import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  Shield,
  Activity,
  Zap
} from 'lucide-react';

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

interface LivePredictionsProps {
  className?: string;
}

const LivePredictions: React.FC<LivePredictionsProps> = ({ className }) => {
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPredictions = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/live-predictions');
      if (!response.ok) throw new Error('Failed to fetch predictions');
      const data = await response.json();
      setPredictions(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch predictions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPredictions();
    const interval = setInterval(fetchPredictions, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [fetchPredictions]);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Critical': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'High': return <TrendingUp className="h-5 w-5 text-orange-600" />;
      case 'Moderate': return <Activity className="h-5 w-5 text-yellow-600" />;
      case 'Low': return <Shield className="h-5 w-5 text-green-600" />;
      default: return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Failed to load live predictions: {error}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const criticalPredictions = predictions.filter(p => p.risk_level === 'Critical');
  const highRiskPredictions = predictions.filter(p => p.risk_level === 'High');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Summary Alert */}
      {(criticalPredictions.length > 0 || highRiskPredictions.length > 0) && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Active Risk Alerts:</strong> {criticalPredictions.length} critical, {highRiskPredictions.length} high risk predictions detected
          </AlertDescription>
        </Alert>
      )}

      {/* Live Predictions List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Live Risk Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Shield className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <p>All mines are currently at low risk levels</p>
              </div>
            ) : (
              predictions.map((prediction) => (
                <div
                  key={prediction.mine_id}
                  className={`p-4 rounded-lg border ${getRiskColor(prediction.risk_level)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getRiskIcon(prediction.risk_level)}
                      <div>
                        <h4 className="font-semibold text-lg">{prediction.mine_name}</h4>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(prediction.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={prediction.risk_level === 'Critical' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {prediction.risk_level}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-2xl font-bold">{prediction.risk_probability.toFixed(1)}%</div>
                      <div className="text-sm text-gray-600">Risk Probability</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{prediction.prediction_timeframe}</div>
                      <div className="text-sm text-gray-600">Time Window</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{prediction.confidence_score.toFixed(1)}%</div>
                      <div className="text-sm text-gray-600">Confidence</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Contributing Factors:</div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                      <div className="text-center p-2 bg-white/50 rounded">
                        <div className="font-medium">{prediction.contributing_factors.ppv.toFixed(2)}</div>
                        <div className="text-gray-600">Peak Particle Velocity</div>
                      </div>
                      <div className="text-center p-2 bg-white/50 rounded">
                        <div className="font-medium">{prediction.contributing_factors.pwp.toFixed(2)}</div>
                        <div className="text-gray-600">Pore Water Pressure</div>
                      </div>
                      <div className="text-center p-2 bg-white/50 rounded">
                        <div className="font-medium">{prediction.contributing_factors.rainfall.toFixed(1)}</div>
                        <div className="text-gray-600">Rainfall</div>
                      </div>
                      <div className="text-center p-2 bg-white/50 rounded">
                        <div className="font-medium">{prediction.contributing_factors.thermal_stress.toFixed(2)}</div>
                        <div className="text-gray-600">Thermal</div>
                      </div>
                      <div className="text-center p-2 bg-white/50 rounded">
                        <div className="font-medium">{prediction.contributing_factors.slope_stability.toFixed(1)}</div>
                        <div className="text-gray-600">Slope</div>
                      </div>
                    </div>
                  </div>

                  {prediction.recommendations.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-2">Recommendations:</div>
                      <ul className="text-sm space-y-1">
                        {prediction.recommendations.slice(0, 2).map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivePredictions;
