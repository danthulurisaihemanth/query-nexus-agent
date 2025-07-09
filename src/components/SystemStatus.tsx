
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Server, Zap, CheckCircle, AlertCircle } from 'lucide-react';

interface SystemStatusProps {
  mongoStatus: 'connected' | 'disconnected' | 'checking';
  mysqlStatus: 'connected' | 'disconnected' | 'checking';
  langchainStatus: 'active' | 'inactive' | 'processing';
}

const SystemStatus: React.FC<SystemStatusProps> = ({
  mongoStatus,
  mysqlStatus,
  langchainStatus
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">Connected</Badge>;
      case 'disconnected':
      case 'inactive':
        return <Badge variant="destructive">Disconnected</Badge>;
      case 'checking':
      case 'processing':
        return <Badge variant="secondary">Processing...</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'disconnected':
      case 'inactive':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Server className="w-4 h-4 text-yellow-600" />;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="w-5 h-5" />
          System Status
        </CardTitle>
        <CardDescription>
          Real-time status of data sources and AI processing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">MongoDB</p>
                <p className="text-sm text-gray-500">Client Profiles</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(mongoStatus)}
              {getStatusBadge(mongoStatus)}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">MySQL</p>
                <p className="text-sm text-gray-500">Transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(mysqlStatus)}
              {getStatusBadge(mysqlStatus)}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium">LangChain AI</p>
                <p className="text-sm text-gray-500">Query Processing</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(langchainStatus)}
              {getStatusBadge(langchainStatus)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatus;
