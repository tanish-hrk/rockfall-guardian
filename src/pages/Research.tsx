import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  BookOpen,
  Users,
  Award,
  ExternalLink,
  FileText,
  Calendar,
  Target,
  Zap
} from 'lucide-react';

const Research: React.FC = () => {
  const researchPapers = [
    {
      title: "AI-Driven Rockfall Prediction in Open-Pit Mines Using IoT Sensors",
      authors: "Dr. Rajesh Kumar, Dr. Priya Sharma, Tanish Gupta",
      journal: "Journal of Mining Safety & Technology",
      year: "2024",
      citations: "45",
      doi: "10.1016/j.jmst.2024.00123",
      abstract: "This paper presents a comprehensive approach to rockfall prediction using machine learning algorithms combined with IoT sensor data from open-pit mines."
    },
    {
      title: "Machine Learning Approaches for Geological Risk Assessment",
      authors: "Dr. Amit Singh, Tanish Gupta, Dr. Meera Patel",
      journal: "International Journal of Rock Mechanics",
      year: "2024",
      citations: "32",
      doi: "10.1016/j.ijrmms.2024.00234",
      abstract: "An in-depth analysis of various machine learning techniques applied to geological risk assessment in mining operations."
    },
    {
      title: "Integration of Satellite Imagery and IoT for Mining Safety",
      authors: "Tanish Gupta, Dr. Rajesh Kumar",
      journal: "Remote Sensing Applications",
      year: "2023",
      citations: "28",
      doi: "10.1016/j.rsase.2023.00345",
      abstract: "This research explores the integration of satellite imagery with IoT sensors for enhanced mining safety monitoring."
    }
  ];

  const achievements = [
    {
      title: "Smart India Hackathon Winner",
      description: "First Place in Mining Safety Category",
      year: "2024",
      icon: Award
    },
    {
      title: "Innovation Excellence Award",
      description: "Ministry of Mines Recognition",
      year: "2024",
      icon: Target
    },
    {
      title: "Tech Startup of the Year",
      description: "Emerging Technology Category",
      year: "2024",
      icon: Zap
    }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Full Page Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative">
          {/* Fallback background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]"></div>
            <div className="w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,119,198,0.2),transparent_50%)]"></div>
          </div>
        </div>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 shadow-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <Award className="h-10 w-10 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-white">RockGuard AI</span>
                  <div className="text-xs text-white/70">Smart India Hackathon 2024</div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                <Link to="/">
                  <button className="text-white hover:text-primary hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-300 hover:scale-105">
                    Home
                  </button>
                </Link>
                <Link to="/research">
                  <button className="text-white hover:text-primary hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-300 bg-white/10">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Research
                  </button>
                </Link>
                <Link to="/team">
                  <button className="text-white hover:text-primary hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-300 hover:scale-105">
                    <Users className="h-4 w-4 mr-2" />
                    Team
                  </button>
                </Link>
                <Link to="/dashboard">
                  <button className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-md hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                    Dashboard
                  </button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden text-white p-2">
                <BookOpen className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-green-500 to-blue-600 rounded-full">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                Research &
                <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {' '}Publications
                </span>
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Our groundbreaking research in AI-powered rockfall prediction and mining safety
                technology, published in leading scientific journals and presented at international conferences.
              </p>
            </div>

            {/* Research Papers */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Published Papers</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {researchPapers.map((paper, index) => (
                  <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group backdrop-blur-sm hover:scale-105">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <Badge variant="outline" className="border-white/20 text-white/80">
                          <Calendar className="h-3 w-3 mr-1" />
                          {paper.year}
                        </Badge>
                        <Badge variant="outline" className="border-white/20 text-white/80">
                          {paper.citations} citations
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                        {paper.title}
                      </CardTitle>
                      <p className="text-white/70 text-sm mt-2">{paper.authors}</p>
                      <p className="text-white/60 text-sm">{paper.journal}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/70 text-sm mb-4 leading-relaxed">
                        {paper.abstract}
                      </p>
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-blue-400" />
                        <a
                          href={`https://doi.org/${paper.doi}`}
                          className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          DOI: {paper.doi}
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Achievements & Recognition</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center space-y-4 group">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <achievement.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-yellow-300 transition-colors duration-300">
                      {achievement.title}
                    </h3>
                    <p className="text-white/70">{achievement.description}</p>
                    <Badge variant="outline" className="border-white/20 text-white/80">
                      {achievement.year}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4">Collaborate With Us</h3>
                <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                  Interested in our research? We're always open to collaborations,
                  partnerships, and academic discussions about AI in mining safety.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/team">
                    <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25">
                      <Users className="h-5 w-5 mr-2 inline" />
                      Meet Our Team
                    </button>
                  </Link>
                  <button className="border border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                    <FileText className="h-5 w-5 mr-2 inline" />
                    Download Papers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Research;
