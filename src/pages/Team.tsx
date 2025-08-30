import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Users,
  Code,
  Database,
  Cloud,
  Search,
  Brain,
  Github,
  Linkedin,
  Mail,
  Award,
  Target,
  Zap
} from 'lucide-react';

interface TeamMember {
  name: string;
  skills: string;
  role: string;
  contribution: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Priyansh Gupta",
      skills: "Backend",
      role: "ML Model Lead & Project Leadership",
      contribution: "Dataset acquisition and project leadership",
      icon: Brain,
      color: "from-blue-500 to-purple-600"
    },
    {
      name: "Tanish Gupta",
      skills: "Frontend",
      role: "Frontend Developer",
      contribution: "Website and dashboard creation",
      icon: Code,
      color: "from-green-500 to-teal-600"
    },
    {
      name: "Advita Singh",
      skills: "Cloud & Core Programming",
      role: "Deployment Specialist",
      contribution: "Deployment and web infrastructure management",
      icon: Cloud,
      color: "from-orange-500 to-red-600"
    },
    {
      name: "Harshita",
      skills: "Research & Data Analysis",
      role: "Research Analyst",
      contribution: "Data gathering and building a solid research foundation",
      icon: Search,
      color: "from-pink-500 to-rose-600"
    },
    {
      name: "Himanshu Singh",
      skills: "Backend & Core Programming",
      role: "Backend Developer",
      contribution: "Backend development and system integration",
      icon: Database,
      color: "from-indigo-500 to-blue-600"
    },
    {
      name: "Harshit Chaudhary",
      skills: "Research & ML Engineering",
      role: "ML Engineer",
      contribution: "Dataset sourcing and model development",
      icon: Target,
      color: "from-cyan-500 to-blue-600"
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
              <div className="flex items-center gap-3 cursor-pointer">
                <Link to="/">
                  <div className="relative">
                    <Award className="h-10 w-10 text-white" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-white">RockGuard AI</span>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                <Link to="/">
                  <button className="text-white hover:text-primary hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-300 hover:scale-105">
                    Home
                  </button>
                </Link>
                <Link to="/research">
                  <button className="text-white hover:text-primary hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-300 hover:scale-105">
                    Research
                  </button>
                </Link>
                <Link to="/team">
                  <button className="text-white hover:text-primary hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-300 bg-white/10">
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
                <Users className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                  <Users className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                Meet Our
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {' '}Team
                </span>
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                The brilliant minds behind Rockfall Guardian - a talented team of innovators,
                researchers, and developers working together to revolutionize mining safety.
              </p>
            </div>

            {/* Team Stats
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">6</div>
                <div className="text-white/70">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">94%</div>
                <div className="text-white/70">Prediction Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">1st</div>
                <div className="text-white/70">Hackathon Rank</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">10+</div>
                <div className="text-white/70">Mines Protected</div>
              </div>
            </div> */}

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group backdrop-blur-sm hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-20 h-20 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <member.icon className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors duration-300">
                      {member.name}
                    </CardTitle>
                    <Badge variant="outline" className="border-white/20 text-white/80 mt-2">
                      {member.skills}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-white/90 mb-2">Role</h4>
                      <p className="text-white/70 text-sm">{member.role}</p>
                    </div>
                    <Separator className="bg-white/10" />
                    <div>
                      <h4 className="text-sm font-semibold text-white/90 mb-2">Key Contribution</h4>
                      <p className="text-white/70 text-sm">{member.contribution}</p>
                    </div>
                    <div className="flex justify-center gap-3 pt-4">
                      <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 group-hover:scale-110">
                        <Github className="h-4 w-4 text-white/70" />
                      </button>
                      <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 group-hover:scale-110">
                        <Linkedin className="h-4 w-4 text-white/70" />
                      </button>
                      <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 group-hover:scale-110">
                        <Mail className="h-4 w-4 text-white/70" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4">Join Our Mission</h3>
                <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                  We're always looking for talented individuals passionate about AI, mining safety,
                  and innovative technology solutions. Interested in contributing to our next project?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                    <Mail className="h-5 w-5 mr-2 inline" />
                    Get In Touch
                  </button>
                  <button className="border border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                    <Github className="h-5 w-5 mr-2 inline" />
                    View Our Work
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

export default Team;
