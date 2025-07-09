
import React, { useState } from 'react';
import { Send, Loader2, Database, TrendingUp, Users, PieChart, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface QueryInterfaceProps {
  onQuery: (query: string) => void;
  isLoading: boolean;
}

const QueryInterface: React.FC<QueryInterfaceProps> = ({ onQuery, isLoading }) => {
  const [query, setQuery] = useState('');

  const sampleQueries = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: "What are the top five portfolios of our wealth members?",
      category: "Portfolio Analysis",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Give me the breakup of portfolio values per relationship manager.",
      category: "RM Performance",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <PieChart className="w-5 h-5" />,
      text: "Tell me the top relationship managers in my firm",
      category: "Team Analytics",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Database className="w-5 h-5" />,
      text: "Which clients are the highest holders of HDFC Bank stock?",
      category: "Stock Holdings",
      color: "from-orange-500 to-red-500"
    }
  ];

  const handleSubmit = () => {
    if (query.trim() && !isLoading) {
      onQuery(query.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Natural Language Query
            </span>
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Ask complex questions about portfolios, clients, and investments in plain English
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your wealth management data... Try: 'Show me the top performing portfolios this quarter with their risk metrics'"
              className="min-h-[120px] pr-16 resize-none text-lg border-2 border-gray-200 focus:border-blue-400 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm"
              disabled={isLoading}
            />
            <Button
              onClick={handleSubmit}
              disabled={!query.trim() || isLoading}
              className="absolute bottom-3 right-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
              size="sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Query
                </>
              )}
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Try these sample queries:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleQueries.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(sample.text)}
                  disabled={isLoading}
                  className="group text-left p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 bg-white/80 backdrop-blur-sm hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${sample.color} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {sample.icon}
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-600 group-hover:text-blue-700 transition-colors">
                      {sample.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 leading-relaxed group-hover:text-gray-900">
                    {sample.text}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QueryInterface;
