import { instance } from '.';
import type { TopProductResponse } from '../models/features/product';

export const getTopProducts = async (year?: number): Promise<TopProductResponse> => {
  try {
    const response = await instance.get<TopProductResponse>('/api/reports/top-products', {
      params: { year },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Lấy dữ liệu sản phẩm thống kê thất bại');
  }
};
