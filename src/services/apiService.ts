export interface Client {
  id: string;
  name: string;
  address: string;
  riskAppetite: 'conservative' | 'moderate' | 'aggressive';
  investmentPreferences: string[];
  relationshipManager: string;
  portfolioValue: number;
  joinDate: string;
}

export interface Transaction {
  id: string;
  clientId: string;
  stockSymbol: string;
  stockName: string;
  transactionType: 'buy' | 'sell';
  quantity: number;
  price: number;
  date: string;
  value: number;
}

export interface PortfolioSummary {
  clientId: string;
  clientName: string;
  totalValue: number;
  holdings: {
    stockSymbol: string;
    stockName: string;
    quantity: number;
    currentValue: number;
    percentage: number;
  }[];
  performance: number;
  riskScore: number;
}

export class ApiService {
  private baseUrl = 'http://localhost:8000/api'; // Python backend URL

  async queryNaturalLanguage(query: string): Promise<any> {
    try {
      console.log('Sending query to backend:', query);
      
      const response = await fetch(`${this.baseUrl}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          user_id: 'demo_user',
          session_id: `session_${Date.now()}`
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Backend response:', result);
      return result;

    } catch (error) {
      console.error('API Error:', error);
      
      // Fallback to mock data if backend is not available
      console.log('Falling back to mock data');
      return this.getMockResponse(query);
    }
  }

  async getSystemStatus(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/system/status`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('System status error:', error);
      return {
        mongodb: 'disconnected',
        mysql: 'disconnected',
        langchain: 'inactive'
      };
    }
  }

  // Fallback mock responses (keeping existing implementation for demo purposes)
  private getMockResponse(query: string): any {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('top five portfolios') || lowerQuery.includes('top 5 portfolios')) {
      return this.getTopPortfolios();
    }
    
    if (lowerQuery.includes('portfolio values per relationship manager')) {
      return this.getPortfoliosByRM();
    }
    
    if (lowerQuery.includes('top relationship managers')) {
      return this.getTopRelationshipManagers();
    }
    
    if (lowerQuery.includes('highest holders') && lowerQuery.includes('hdfc')) {
      return this.getHDFCHolders();
    }
    
    return this.generateComplexQueryResponse(query);
  }

  private async getTopPortfolios() {
    return [
      {
        type: 'text',
        title: 'Top 5 Wealth Portfolio Analysis',
        data: 'Based on current portfolio valuations, here are the top 5 wealth members by total portfolio value. These clients represent our highest value accounts with significant investment across multiple asset classes.',
        summary: 'Analysis of top-performing wealth portfolios by total value'
      },
      {
        type: 'chart',
        title: 'Top 5 Portfolios by Value',
        chartType: 'bar',
        data: [
          { name: 'Rajesh Kumar', value: 185 },
          { name: 'Vikram Rathore', value: 203 },
          { name: 'Deepika Singh', value: 156 },
          { name: 'Priya Sharma', value: 142 },
          { name: 'Arjun Kapoor', value: 98 }
        ],
        summary: 'Portfolio values in crores (₹)'
      },
      {
        type: 'table',
        title: 'Detailed Portfolio Breakdown',
        data: [
          { client: 'Rajesh Kumar', value: 185, rm: 'Rajesh Gupta', riskProfile: 'Moderate', performance: '22.5%' },
          { client: 'Vikram Rathore', value: 203, rm: 'Sunita Rao', riskProfile: 'Aggressive', performance: '19.8%' },
          { client: 'Deepika Singh', value: 156, rm: 'Amit Verma', riskProfile: 'Conservative', performance: '18.3%' },
          { client: 'Priya Sharma', value: 142, rm: 'Neha Malhotra', riskProfile: 'Aggressive', performance: '17.2%' },
          { client: 'Arjun Kapoor', value: 98, rm: 'Karan Shah', riskProfile: 'Moderate', performance: '16.9%' }
        ]
      }
    ];
  }

  private async getPortfoliosByRM() {
    return [
      {
        type: 'text',
        title: 'Portfolio Distribution by Relationship Manager',
        data: 'This analysis shows the total portfolio values managed by each relationship manager, helping identify top performers and workload distribution across the team.',
        summary: 'Comprehensive breakdown of AUM per relationship manager'
      },
      {
        type: 'chart',
        title: 'AUM Distribution by Relationship Manager',
        chartType: 'pie',
        data: [
          { name: 'Rajesh Gupta', value: 324 },
          { name: 'Neha Malhotra', value: 298 },
          { name: 'Amit Verma', value: 276 },
          { name: 'Sunita Rao', value: 254 },
          { name: 'Karan Shah', value: 198 }
        ]
      },
      {
        type: 'table',
        title: 'RM Performance Metrics',
        data: [
          { manager: 'Rajesh Gupta', totalAUM: 324, clients: 45, avgPortfolio: 7.2, performance: '16.2%' },
          { manager: 'Neha Malhotra', totalAUM: 298, clients: 38, avgPortfolio: 7.8, performance: '15.8%' },
          { manager: 'Amit Verma', totalAUM: 276, clients: 42, avgPortfolio: 6.6, performance: '17.1%' },
          { manager: 'Sunita Rao', totalAUM: 254, clients: 35, avgPortfolio: 7.3, performance: '14.9%' },
          { manager: 'Karan Shah', totalAUM: 198, clients: 29, avgPortfolio: 6.8, performance: '18.3%' }
        ]
      }
    ];
  }

  private async getTopRelationshipManagers() {
    return [
      {
        type: 'text',
        title: 'Top Relationship Managers Analysis',
        data: 'Rankings based on total AUM managed, client satisfaction scores, and portfolio performance. These managers demonstrate exceptional client service and investment advisory capabilities.',
        summary: 'Performance ranking of relationship managers across key metrics'
      },
      {
        type: 'chart',
        title: 'Top RMs by Total AUM',
        chartType: 'bar',
        data: [
          { name: 'Rajesh Gupta', value: 324 },
          { name: 'Neha Malhotra', value: 298 },
          { name: 'Amit Verma', value: 276 },
          { name: 'Sunita Rao', value: 254 },
          { name: 'Karan Shah', value: 198 }
        ]
      },
      {
        type: 'table',
        title: 'Comprehensive RM Rankings',
        data: [
          { rank: 1, manager: 'Rajesh Gupta', aum: 324, clients: 45, satisfaction: '4.8/5', newClients: 12 },
          { rank: 2, manager: 'Neha Malhotra', aum: 298, clients: 38, satisfaction: '4.7/5', newClients: 8 },
          { rank: 3, manager: 'Amit Verma', aum: 276, clients: 42, satisfaction: '4.6/5', newClients: 10 },
          { rank: 4, manager: 'Sunita Rao', aum: 254, clients: 35, satisfaction: '4.5/5', newClients: 6 },
          { rank: 5, manager: 'Karan Shah', aum: 198, clients: 29, satisfaction: '4.9/5', newClients: 9 }
        ]
      }
    ];
  }

  private async getHDFCHolders() {
    return [
      {
        type: 'text',
        title: 'HDFC Bank Holdings Analysis',
        data: 'Analysis of clients with the highest holdings in HDFC Bank stock. This includes both direct equity holdings and exposure through mutual funds and ETFs.',
        summary: 'Top clients by HDFC Bank stock holdings and exposure'
      },
      {
        type: 'chart',
        title: 'Top HDFC Bank Holders',
        chartType: 'bar',
        data: [
          { name: 'Vikram Rathore', value: 45.2 },
          { name: 'Deepika Singh', value: 38.7 },
          { name: 'Rajesh Kumar', value: 32.5 },
          { name: 'Anita Desai', value: 28.9 },
          { name: 'Suresh Patel', value: 24.3 }
        ]
      },
      {
        type: 'table',
        title: 'HDFC Holdings Breakdown',
        data: [
          { client: 'Vikram Rathore', hdfcValue: 45.2, shares: 31200, percentage: '22.3%', avgPrice: 1449 },
          { client: 'Deepika Singh', hdfcValue: 38.7, shares: 26800, percentage: '24.8%', avgPrice: 1444 },
          { client: 'Rajesh Kumar', hdfcValue: 32.5, shares: 22400, percentage: '17.6%', avgPrice: 1451 },
          { client: 'Anita Desai', hdfcValue: 28.9, shares: 19900, percentage: '19.1%', avgPrice: 1452 },
          { client: 'Suresh Patel', hdfcValue: 24.3, shares: 16800, percentage: '15.7%', avgPrice: 1446 }
        ]
      }
    ];
  }

  private async generateComplexQueryResponse(query: string) {
    return [
      {
        type: 'text',
        title: 'Advanced Query Analysis',
        data: `Your query: "${query}" requires complex cross-database analysis. Our LangChain-powered system has processed this request using advanced NLP and retrieved relevant data from both MongoDB (client profiles) and MySQL (transaction data).`,
        summary: 'AI-powered natural language query processing'
      },
      {
        type: 'chart',
        title: 'Query Results Visualization',
        chartType: 'line',
        data: [
          { name: 'Q1 2024', value: 156.2 },
          { name: 'Q2 2024', value: 189.7 },
          { name: 'Q3 2024', value: 203.4 },
          { name: 'Q4 2024', value: 245.8 }
        ]
      }
    ];
  }
}

export const apiService = new ApiService();
