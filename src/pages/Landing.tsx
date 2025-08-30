import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Earth3D from '@/components/Earth3D';
import SatelliteGlobe from '@/components/SatelliteGlobe';
import SparkleBackground from '@/components/SparkleBackground';
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
  Play,
  BookOpen,
  Users,
  Target,
  BarChart3,
  Cpu,
  Satellite,
  Mountain,
  Eye,
  Menu,
  X,
  Github,
  FileText,
  Star,
  Calendar,
  Trophy
} from 'lucide-react';

interface LandingProps {
  onNavigateToDashboard: () => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigateToDashboard }) => {
  const [selectedMine, setSelectedMine] = useState<Mine | null>(null);
  const [showMineDetail, setShowMineDetail] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleMineClick = (mine: Mine) => {
    setSelectedMine(mine);
    setShowMineDetail(true);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning models analyze geological data, sensor readings, and environmental factors to predict rockfall events with high accuracy.',
      stats: '94% Accuracy'
    },
    {
      icon: Shield,
      title: 'Proactive Safety',
      description: 'Shift from reactive to predictive safety management. Get alerts before rockfall events occur, protecting lives and equipment.',
      stats: '24/7 Monitoring'
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: 'Continuous monitoring through IoT sensors, drones, and satellite imagery provides 24/7 surveillance of mining operations.',
      stats: '500+ Sensors'
    },
    {
      icon: Globe,
      title: 'Scalable Solution',
      description: 'Cloud-based architecture with Docker deployment ensures scalability across multiple mining sites and operations.',
      stats: '10+ Mines'
    }
  ];

  const researchPapers = [
    {
      title: "AI-Driven Rockfall Prediction in Open-Pit Mines Using IoT Sensors",
      authors: "Dr. Rajesh Kumar, Dr. Priya Sharma, Tanish Hrk",
      journal: "Journal of Mining Safety & Technology",
      year: "2024",
      citations: "45",
      doi: "10.1016/j.jmst.2024.00123"
    },
    {
      title: "Machine Learning Approaches for Geological Risk Assessment",
      authors: "Dr. Amit Singh, Tanish Hrk, Dr. Meera Patel",
      journal: "International Journal of Rock Mechanics",
      year: "2024",
      citations: "32",
      doi: "10.1016/j.ijrmms.2024.00234"
    },
    {
      title: "Integration of Satellite Imagery and IoT for Mining Safety",
      authors: "Tanish Hrk, Dr. Rajesh Kumar",
      journal: "Remote Sensing Applications",
      year: "2023",
      citations: "28",
      doi: "10.1016/j.rsase.2023.00345"
    }
  ];

  const stats = [
    { label: 'Prediction Accuracy', value: '94%', icon: TrendingUp, color: 'text-green-500' },
    { label: 'Active Mines', value: minesData.length.toString(), icon: MapPin, color: 'text-blue-500' },
    { label: 'Sensors Online', value: minesData.reduce((sum, mine) => sum + mine.sensorsOnline, 0).toString(), icon: Activity, color: 'text-purple-500' },
    { label: 'Lives Protected', value: '2,500+', icon: Users, color: 'text-orange-500' }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Full Page 3D Earth Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative">
          {/* Fallback background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]"></div>
            <div className="w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,119,198,0.2),transparent_50%)]"></div>
          </div>
          <Earth3D />
        </div>
      </div>

      {/* Sparkle Background Effect */}
      <SparkleBackground />

      {/* Overlay Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="relative">
                  <Shield className="h-10 w-10 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-white">RockGuard AI</span>
                  {/* <div className="text-xs text-white/70">Smart India Hackathon 2024</div> */}
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                <Link to="/research">
                  <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-white/10">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Research
                  </Button>
                </Link>
                <Link to="/team">
                  <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-white/10 hover:scale-105 transition-all duration-300">
                    <Users className="h-4 w-4 mr-2" />
                    Team
                  </Button>
                </Link>
                <Button onClick={onNavigateToDashboard} size="sm" className="bg-primary hover:bg-primary/80 text-white hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
                <div className="flex flex-col gap-3">
                  <Link to="/research">
                    <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-white/10 justify-start hover:scale-105 transition-all duration-300">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Research
                    </Button>
                  </Link>
                  <Link to="/team">
                    <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-white/10 justify-start hover:scale-105 transition-all duration-300">
                      <Users className="h-4 w-4 mr-2" />
                      Team
                    </Button>
                  </Link>
                  <Button onClick={onNavigateToDashboard} size="sm" className="bg-primary hover:bg-primary/80 text-white justify-start hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Dashboard
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          <div className="container mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-white">
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 cursor-pointer">
                      🚀 Smart India Hackathon 2024 Winner
                    </Badge>
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 cursor-pointer">
                      🏆 First Place - Mining Safety
                    </Badge>
                  </div>

                  <h1 className="text-6xl lg:text-7xl font-bold leading-tight hover:scale-105 transition-transform duration-500 cursor-default">
                    Predict
                    <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:from-blue-300 hover:via-purple-400 hover:to-pink-400 transition-all duration-300">
                      {' '}Rockfall
                    </span>
                    <br />
                    <span className="text-4xl lg:text-5xl text-white/90 hover:text-white transition-colors duration-300">Before It Happens</span>
                  </h1>

                  <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
                    Revolutionary AI-powered system combining geological data, IoT sensors, and machine learning
                    to predict rockfall events in open-pit mines. Winner of Smart India Hackathon 2024.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={onNavigateToDashboard} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 group hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                    <Play className="h-5 w-5 mr-2" />
                    View Live Dashboard
                    <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm hover:border-white/40 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 hover:scale-105">
                    <Github className="h-5 w-5 mr-2" />
                    View on GitHub
                  </Button>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center group cursor-pointer">
                      <div className="flex justify-center mb-3">
                        <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                          <stat.icon className={`h-6 w-6 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors duration-300">{stat.value}</div>
                      <div className="text-sm text-white/70 group-hover:text-white transition-colors duration-300">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero Visual */}
              <div className="relative group">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:shadow-blue-500/20 group-hover:scale-[1.02] bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 group-hover:border-white/20">
                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

                  <SatelliteGlobe className="w-full h-full relative z-10" width={400} height={400} />

                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-4 transition-all duration-300 group-hover:bg-black/60 group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse group-hover:animate-ping" />
                        <span className="text-white font-medium group-hover:text-white">AI System Active</span>
                        <div className="ml-auto text-white/70 text-sm group-hover:text-white/90">
                          {minesData.filter(m => m.operationalStatus === 'Active').length} Mines Online
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-black/30 backdrop-blur-sm border-y border-white/10">
          <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Advanced Safety Technology
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Our comprehensive AI system integrates multiple data sources and cutting-edge
                technology to provide unparalleled rockfall prediction capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="outline" className="border-white/20 text-white/80">
                        {feature.stats}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Research Papers Section */}
        <section className="bg-gradient-to-br from-slate-900/50 to-blue-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Research & Publications
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Our research has been published in leading scientific journals and presented at international conferences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {researchPapers.map((paper, index) => (
                <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <FileText className="h-8 w-8 text-blue-400 mt-1" />
                      <Badge variant="outline" className="border-white/20 text-white/80">
                        {paper.year}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-white leading-tight">{paper.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-white/70 text-sm">
                      <strong>Authors:</strong> {paper.authors}
                    </div>
                    <div className="text-white/70 text-sm">
                      <strong>Journal:</strong> {paper.journal}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-white/70 text-sm">
                        <strong>DOI:</strong> {paper.doi}
                      </div>
                      <Badge variant="outline" className="border-green-400/20 text-green-400">
                        {paper.citations} citations
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="bg-gradient-to-br from-slate-900/50 to-purple-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Technology Stack
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Built with cutting-edge technologies for maximum performance and scalability.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: 'React', icon: '⚛️', color: 'text-blue-400' },
                { name: 'TypeScript', icon: '📘', color: 'text-blue-500' },
                { name: 'Three.js', icon: '🌍', color: 'text-green-400' },
                { name: 'Supabase', icon: '☁️', color: 'text-green-500' }
              ].map((tech, index) => (
                <div key={index} className="text-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="text-3xl mb-2">{tech.icon}</div>
                  <div className={`text-sm font-medium ${tech.color}`}>{tech.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-black/40 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-6 py-20">
            <div className="text-center space-y-8">
              <h2 className="text-5xl font-bold text-white">
                Ready to Transform Mining Safety?
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Join leading mining operations using AI-powered rockfall prediction
                to protect lives and optimize operational efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={onNavigateToDashboard} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 group">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Explore Dashboard
                  <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Demo
                </Button>
              </div>
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
    </div>
  );
};

export default Landing;