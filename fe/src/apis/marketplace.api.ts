import { http } from "@/lib/http";
import { ApiResponse } from "@/types";

export type PageResponse<T> = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  data: T[];
};

export interface ProductType {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  price: number;
  rating: number;
  salesCount: number;
  productType: string;
  techStack: string[];
  seller: {
    username: string;
    avatar: string;
    verified: boolean;
  };
}

export const marketplaceApi = {
  getProducts: async (params?: Record<string, string | number>) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });
    }
    const query = searchParams.toString() ? `?${searchParams.toString()}` : "";
    return http<ApiResponse<PageResponse<ProductType>>>(`/api/v1/marketplace/products${query}`);
  },
  getProductBySlug: async (slug: string) => {
    return http<ApiResponse<ProductType>>(`/api/v1/marketplace/products/${slug}`);
  },
};
