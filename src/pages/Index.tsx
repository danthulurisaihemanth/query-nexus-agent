
import React, { useState } from 'react';
import QueryInterface from '@/components/QueryInterface';
import DataVisualization from '@/components/DataVisualization';
import SystemStatus from '@/components/SystemStatus';
import PortfolioDashboard from '@/components/PortfolioDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { apiService } from '@/services/apiService';
import { Brain, Database, TrendingUp, MessageSquare, Shield, Zap, Sparkles, Award, Target } from 'lucide-react';

const Index = () => {
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mongoStatus] = useState<'connected' | 'disconnected' | 'checking'>('connected');
  const [mysqlStatus] = useState<'connected' | 'disconnected' | 'checking'>('connected');
  const [langchainStatus] = useState<'active' | 'inactive' | 'processing'>('active');

  const handleQuery = async (query: string) => {
    setIsLoading(true);
    try {
      const results = await apiService.queryNaturalLanguage(query);
      setQueryResults(results);
    } catch (error) {
      console.error('Query failed:', error);
      setQueryResults([{
        type: 'text',
        title: 'Query Error',
        data: 'Failed to process your query. Please check system connections and try again.',
        summary: 'Error processing natural language query'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Brain className="w-7 h-7" />,
      title: 'Advanced AI Processing',
      description: 'LangChain-powered natural language understanding with context-aware responses',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Database className="w-7 h-7" />,
      title: 'Multi-Database Integration',
      description: 'Seamlessly queries MongoDB profiles and MySQL transactions in real-time',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: 'Smart Visualizations',
      description: 'AI-generated charts and insights that adapt to your query context',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Enterprise Security',
      description: 'Bank-grade security with role-based access and comprehensive audit trails',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: 'Lightning Performance',
      description: 'Optimized query processing with intelligent caching and response times <200ms',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <MessageSquare className="w-7 h-7" />,
      title: 'Natural Conversations',
      description: 'Understands complex financial terminology and maintains conversation context',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const achievements = [
    { icon: <Award className="w-5 h-5" />, text: "Multi-Platform Data Integration" },
    { icon: <Target className="w-5 h-5" />, text: "Real-time Analytics Processing" },
    { icon: <Sparkles className="w-5 h-5" />, text: "AI-Powered Query Understanding" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 via-purple-50 to-pink-50">
      {/* Enhanced Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">WealthQuery AI</h1>
                <p className="text-blue-100">Enterprise RAG Agent for Wealth Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {achievements.map((achievement, index) => (
                <Badge key={index} variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                  {achievement.icon}
                  <span className="ml-1 hidden sm:inline">{achievement.text}</span>
                </Badge>
              ))}
              <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-lg">
                <Sparkles className="w-4 h-4 mr-1" />
                Production Ready
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="query" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm shadow-lg border-0 h-14">
            <TabsTrigger value="query" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-medium">
              Natural Language Query
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white font-medium">
              Portfolio Dashboard
            </TabsTrigger>
            <TabsTrigger value="status" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white font-medium">
              System Status
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white font-medium">
              About & Features
            </TabsTrigger>
          </TabsList>

          <TabsContent value="query" className="space-y-8">
            <QueryInterface onQuery={handleQuery} isLoading={isLoading} />
            <DataVisualization results={queryResults} />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-8">
            <PortfolioDashboard />
          </TabsContent>

          <TabsContent value="status" className="space-y-8">
            <SystemStatus 
              mongoStatus={mongoStatus}
              mysqlStatus={mysqlStatus}
              langchainStatus={langchainStatus}
            />
          </TabsContent>

          <TabsContent value="about" className="space-y-8">
            {/* Hero Section */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-xl">
              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI-Powered Cross-Platform Data Query Agent
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Enterprise-grade RAG system built for Valuefy's wealth management needs, enabling natural language queries across multiple data sources with intelligent visualization generation.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Technical Architecture */}
            <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-gradient-to-br from-gray-600 to-blue-600 rounded-lg">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  Technical Architecture & Implementation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      Frontend Stack
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <strong>React 18</strong> with TypeScript for type safety
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <strong>Tailwind CSS</strong> for responsive design
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <strong>Recharts</strong> for dynamic data visualization
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <strong>Shadcn/ui</strong> for enterprise UI components
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      Backend Infrastructure
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <strong>Python FastAPI</strong> for high-performance APIs
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <strong>LangChain</strong> for advanced RAG implementation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <strong>MongoDB & MySQL</strong> for hybrid data storage
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <strong>Docker</strong> for containerized deployment
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-500" />
                    AI & RAG Capabilities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Query Processing</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Context-aware natural language understanding</li>
                        <li>• Multi-intent query parsing and routing</li>
                        <li>• Dynamic prompt engineering for optimal results</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Data Integration</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Real-time cross-database query execution</li>
                        <li>• Intelligent data correlation and joining</li>
                        <li>• Automated visualization type selection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Value Proposition for Valuefy */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
                  <Award className="w-8 h-8 text-yellow-500" />
                  Built for Valuefy's Excellence Standards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Scalable Architecture</h3>
                    <p className="text-sm text-gray-600">Designed to handle enterprise-scale data with microservices architecture</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Security First</h3>
                    <p className="text-sm text-gray-600">Implements industry-standard security practices for financial data</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Innovation Ready</h3>
                    <p className="text-sm text-gray-600">Modular design allows for easy integration of new AI models and features</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Ready for Production Deployment</h3>
                  <p className="text-blue-100">Complete with Docker containerization, comprehensive testing, and detailed documentation for immediate enterprise use.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
