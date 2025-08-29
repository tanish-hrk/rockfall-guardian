import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Earth3D from '@/components/Earth3D';
import MineDetailModal from '@/components/MineDetailModal';
import { Mine, minesData } from '@/data/mineData';
import {
  Shield,
  Brain,
  Zap,
  Globe,
  TrendingUp,
  AlertTriangle,
  Activity,
  MapPin,
  ChevronRight,
  Play
} from 'lucide-react';

interface LandingProps {
  onNavigateToDashboard: () => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigateToDashboard }) => {
  const [selectedMine, setSelectedMine] = useState<Mine | null>(null);
  const [showMineDetail, setShowMineDetail] = useState(false);

  const handleMineClick = (mine: Mine) => {
    setSelectedMine(mine);
    setShowMineDetail(true);
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning models analyze geological data, sensor readings, and environmental factors to predict rockfall events with high accuracy.'
    },
    {
      icon: Shield,
      title: 'Proactive Safety',
      description: 'Shift from reactive to predictive safety management. Get alerts before rockfall events occur, protecting lives and equipment.'
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: 'Continuous monitoring through IoT sensors, drones, and satellite imagery provides 24/7 surveillance of mining operations.'
    },
    {
      icon: Globe,
      title: 'Scalable Solution',
      description: 'Cloud-based architecture with Docker deployment ensures scalability across multiple mining sites and operations.'
    }
  ];

  const stats = [
    { label: 'Prediction Accuracy', value: '94%', icon: TrendingUp },
    { label: 'Active Mines', value: minesData.length.toString(), icon: MapPin },
    { label: 'Sensors Online', value: minesData.reduce((sum, mine) => sum + mine.sensorsOnline, 0).toString(), icon: Activity },
    { label: 'Active Alerts', value: minesData.reduce((sum, mine) => sum + mine.alertsActive, 0).toString(), icon: AlertTriangle }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="bg-card/95 backdrop-blur-sm border-b border-border shadow-mining">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">RockGuard AI</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">Features</Button>
              <Button variant="ghost" size="sm">About</Button>
              <Button onClick={onNavigateToDashboard} size="sm">
                Dashboard
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="w-fit">
                🚀 AI-Powered Safety Technology
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Predict
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {' '}Rockfall
                </span>
                <br />
                Before It Happens
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Revolutionary AI system that combines geological data, IoT sensors, and machine learning 
                to predict rockfall events in open-pit mines, ensuring safety and operational efficiency.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={onNavigateToDashboard} className="group">
                <Play className="h-4 w-4 mr-2" />
                View Live Dashboard
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Earth */}
          <div className="relative">
            <div className="aspect-square rounded-xl bg-gradient-slate shadow-earth overflow-hidden">
              <Earth3D onMineClick={handleMineClick} />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg p-4 shadow-mining">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                <span className="text-sm font-medium">Live Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Advanced Safety Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive AI system integrates multiple data sources and cutting-edge 
            technology to provide unparalleled rockfall prediction capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 hover:border-primary/20 transition-colors group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Innovation Highlights */}
      <section className="bg-card/30 backdrop-blur-sm border-y border-border">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Innovation Highlights
            </h2>
            <p className="text-xl text-muted-foreground">
              Transforming mining safety through cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-earth rounded-full flex items-center justify-center mx-auto">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Hybrid AI Models</h3>
              <p className="text-muted-foreground">
                Combines DEM data, drone imagery, sensor readings, and environmental inputs 
                for comprehensive risk assessment.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-earth rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Real-time Alerts</h3>
              <p className="text-muted-foreground">
                Instant SMS and dashboard notifications ensure rapid response 
                to potential rockfall events.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-earth rounded-full flex items-center justify-center mx-auto">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Scalable Deployment</h3>
              <p className="text-muted-foreground">
                Cloud-Docker ready architecture scales across multiple mining 
                operations with cost-effective IoT integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <h2 className="text-4xl font-bold">
            Ready to Transform Your Mining Safety?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join leading mining operations using AI-powered rockfall prediction 
            to protect lives and optimize operational efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onNavigateToDashboard} className="group">
              Explore Dashboard
              <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Mine Detail Modal */}
      <MineDetailModal
        mine={selectedMine}
        open={showMineDetail}
        onOpenChange={setShowMineDetail}
      />
    </div>
  );
};

export default Landing;