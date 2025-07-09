
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, DollarSign, Target, Briefcase, Star, Award, Sparkles } from 'lucide-react';

interface DashboardMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

const PortfolioDashboard: React.FC = () => {
  const metrics: DashboardMetric[] = [
    {
      title: 'Total AUM',
      value: '₹2,450 Cr',
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign className="w-7 h-7" />,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Active Clients',
      value: '847',
      change: '+23',
      trend: 'up',
      icon: <Users className="w-7 h-7" />,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Relationship Managers',
      value: '24',
      change: '+2',
      trend: 'up',
      icon: <Briefcase className="w-7 h-7" />,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Avg Portfolio Performance',
      value: '15.8%',
      change: '+2.3%',
      trend: 'up',
      icon: <TrendingUp className="w-7 h-7" />,
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'High Net Worth Clients',
      value: '156',
      change: '+8',
      trend: 'up',
      icon: <Star className="w-7 h-7" />,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      title: 'Risk-Adjusted Returns',
      value: '13.2%',
      change: '+1.8%',
      trend: 'up',
      icon: <Target className="w-7 h-7" />,
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Wealth Management Dashboard
            </span>
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Real-time insights and performance metrics for portfolio management excellence
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${metric.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {metric.icon}
                  </div>
                </div>
                <div className={`flex items-center gap-2 ${getTrendColor(metric.trend)} font-bold`}>
                  <span className="text-lg">{metric.change}</span>
                  <span className="text-2xl">{getTrendIcon(metric.trend)}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              Top Performing Portfolios
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Highest returns in the last quarter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Rajesh Kumar', performance: '22.5%', aum: '₹185 Cr', rank: 1 },
                { name: 'Priya Sharma', performance: '19.8%', aum: '₹142 Cr', rank: 2 },
                { name: 'Arjun Kapoor', performance: '18.3%', aum: '₹98 Cr', rank: 3 },
                { name: 'Deepika Singh', performance: '17.2%', aum: '₹156 Cr', rank: 4 },
                { name: 'Vikram Rathore', performance: '16.9%', aum: '₹203 Cr', rank: 5 }
              ].map((client, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                    client.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                    client.rank === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                    client.rank === 3 ? 'bg-gradient-to-br from-yellow-600 to-yellow-800' :
                    'bg-gradient-to-br from-blue-500 to-purple-600'
                  }`}>
                    {client.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{client.name}</p>
                    <p className="text-sm text-gray-600">AUM: {client.aum}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">{client.performance}</div>
                    <div className="text-xs text-gray-500">Returns</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              Top Relationship Managers
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              By total AUM managed and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Rajesh Gupta', clients: 45, aum: '₹324 Cr', performance: '16.2%', rank: 1 },
                { name: 'Neha Malhotra', clients: 38, aum: '₹298 Cr', performance: '15.8%', rank: 2 },
                { name: 'Amit Verma', clients: 42, aum: '₹276 Cr', performance: '17.1%', rank: 3 },
                { name: 'Sunita Rao', clients: 35, aum: '₹254 Cr', performance: '14.9%', rank: 4 },
                { name: 'Karan Shah', clients: 29, aum: '₹198 Cr', performance: '18.3%', rank: 5 }
              ].map((manager, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                    manager.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                    manager.rank === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                    manager.rank === 3 ? 'bg-gradient-to-br from-yellow-600 to-yellow-800' :
                    'bg-gradient-to-br from-blue-500 to-purple-600'
                  }`}>
                    {manager.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{manager.name}</p>
                    <p className="text-sm text-gray-600">{manager.clients} clients</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-900">{manager.aum}</p>
                    <p className="text-sm text-green-600 font-medium">{manager.performance}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioDashboard;
