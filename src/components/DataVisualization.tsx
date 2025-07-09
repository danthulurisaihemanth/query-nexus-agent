
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, Users, DollarSign, Award, Sparkles, BarChart3 } from 'lucide-react';

interface QueryResult {
  type: 'text' | 'table' | 'chart';
  title: string;
  data: any;
  chartType?: 'bar' | 'pie' | 'line';
  summary?: string;
}

interface DataVisualizationProps {
  results: QueryResult[];
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

const DataVisualization: React.FC<DataVisualizationProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <Card className="w-full max-w-5xl mx-auto bg-gradient-to-br from-gray-50 to-blue-50 border-0 shadow-xl">
        <CardContent className="flex flex-col items-center justify-center h-48 space-y-4">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
            <BarChart3 className="w-12 h-12 text-white" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Ready for Your Query</h3>
            <p className="text-gray-500">Ask a question above to see intelligent visualizations and insights</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderChart = (result: QueryResult) => {
    const { data, chartType } = result;

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fill: '#64748b' }} />
              <YAxis tick={{ fill: '#64748b' }} />
              <Tooltip 
                formatter={(value) => [`₹${value} Cr`, 'Portfolio Value']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                }}
              />
              <Legend />
              <Bar dataKey="value" fill="url(#blueGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`₹${value} Cr`, 'Value']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fill: '#64748b' }} />
              <YAxis tick={{ fill: '#64748b' }} />
              <Tooltip 
                formatter={(value) => [`₹${value} Cr`, 'Performance']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#1D4ED8' }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      default:
        return <p className="text-gray-500 text-center py-8">Chart type not supported</p>;
    }
  };

  const renderTable = (result: QueryResult) => {
    const { data } = result;
    if (!Array.isArray(data) || data.length === 0) return <p className="text-gray-500 text-center py-8">No data available</p>;

    const columns = Object.keys(data[0]);

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50">
              {columns.map((column) => (
                <TableHead key={column} className="font-semibold text-gray-700">
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                {columns.map((column) => (
                  <TableCell key={column} className="font-medium">
                    {typeof row[column] === 'number' && column.includes('value') 
                      ? `₹${row[column]} Cr` 
                      : row[column]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('portfolio')) return <TrendingUp className="w-6 h-6" />;
    if (title.toLowerCase().includes('manager')) return <Users className="w-6 h-6" />;
    if (title.toLowerCase().includes('performance')) return <Award className="w-6 h-6" />;
    return <DollarSign className="w-6 h-6" />;
  };

  const getGradientColor = (index: number) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-emerald-600', 
      'from-orange-500 to-red-600',
      'from-purple-500 to-pink-600',
      'from-cyan-500 to-blue-600'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {results.map((result, index) => (
        <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-3">
              <div className={`p-2 bg-gradient-to-br ${getGradientColor(index)} rounded-lg shadow-lg`}>
                <div className="text-white">
                  {getIcon(result.title)}
                </div>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">{result.title}</span>
                {result.summary && (
                  <div className="flex items-center gap-2 mt-1">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">{result.summary}</span>
                  </div>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {result.type === 'text' && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed text-lg">{result.data}</p>
              </div>
            )}
            {result.type === 'table' && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                {renderTable(result)}
              </div>
            )}
            {result.type === 'chart' && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
                {renderChart(result)}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DataVisualization;
