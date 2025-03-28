import { instance } from '.';
import type { TopProductResponse } from '../models/features/product';

export const getSaleByCityAndCategory = async (year?: number): Promise<TopProductResponse> => {
  try {
    const response = await instance.get<TopProductResponse>('/api/reports/top-products', {
      params: { year },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Lấy dữ liệu sản phẩm thống kê thất bại');
  }
};

export const getTotalSalesYear = async (year?: number) => {
  try {
    const response = await instance.get<any[]>('/api/reports/total-sales-year', {
      params: { year },
    });

    console.log(response);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Lấy dữ liệu sản phẩm thống kê thất bại');
  }
};
