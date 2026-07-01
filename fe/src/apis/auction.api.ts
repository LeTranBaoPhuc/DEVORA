import { http } from '@/lib/http';

export interface AuctionFilterParams {
  categories?: string[];
  minBudget?: number;
  maxBudget?: number;
  status?: string;
  deadline?: string;
  search?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}

export const auctionApi = {
  getAuctions: (params: AuctionFilterParams) => {
    const query = new URLSearchParams();
    if (params.categories) params.categories.forEach(c => query.append('categories', c));
    if (params.minBudget) query.append('minBudget', params.minBudget.toString());
    if (params.maxBudget) query.append('maxBudget', params.maxBudget.toString());
    if (params.status && params.status !== 'all') query.append('status', params.status);
    if (params.deadline) query.append('deadline', params.deadline);
    if (params.search) query.append('search', params.search);
    if (params.page) query.append('page', params.page.toString());
    if (params.size) query.append('size', params.size.toString());
    if (params.sortBy) query.append('sortBy', params.sortBy);
    if (params.sortDirection) query.append('sortDirection', params.sortDirection);

    return http<any>(`/api/auctions?${query.toString()}`, { method: 'GET' });
  },

  getAuctionById: (id: number | string) => http<any>(`/api/auctions/${id}`, {
    method: 'GET',
  }),

  getAuctionBySlug: (slug: string) => http<any>(`/api/auctions/slug/${slug}`, {
    method: 'GET',
  }),

  createAuction: (data: any) => http<any>('/api/auctions', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  updateAuction: (id: number | string, data: any) => http<any>(`/api/auctions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  deleteAuction: (id: number | string) => http<any>(`/api/auctions/${id}`, {
    method: 'DELETE',
  }),

  placeBid: (data: any) => http<any>('/api/auctions/bids', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  getBidsForAuction: (id: number | string) => http<any>(`/api/auctions/${id}/bids`, {
    method: 'GET',
  }),

  acceptBid: (bidId: number | string) => http<any>(`/api/auctions/bids/${bidId}/accept`, {
    method: 'POST',
  }),
};
