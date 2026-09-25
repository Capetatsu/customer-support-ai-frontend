import { DashboardMetrics, TrendCluster } from '../types';
import { mockDashboardMetrics, mockTrends } from '../data/mockRepository';

export const analyticsService = {
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    return { ...mockDashboardMetrics };
  },

  async getTrends(): Promise<TrendCluster[]> {
    return [...mockTrends];
  },

  async getTrendByName(name: string): Promise<TrendCluster | null> {
    const found = mockTrends.find((t) => t.cluster_name.toLowerCase() === name.toLowerCase());
    return found || null;
  },
};
