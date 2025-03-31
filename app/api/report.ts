import { instance } from '.';
import type { TopProduct, SubcategorySales, YearlySales } from '../models/report';

export const getTopProductsByRevenue = async (region: string, year: string): Promise<TopProduct[]> => {
  try {
    const response = await instance.get<TopProduct[]>(`report/${region}/top-products-by-revenue`, {
      params: { year },
    });

    console.log(response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTotalSalesBySubcategory = async (region: string, year: string): Promise<SubcategorySales[]> => {
  try {
    const response = await instance.get<SubcategorySales[]>(`report/${region}/total-sales-by-subcategory`, {
      params: { year },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTotalSalesByYear = async (region: string, year: string): Promise<YearlySales[]> => {
  try {
    const response = await instance.get<YearlySales[]>(`report/${region}/total-sales-by-year`, {
      params: { year },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
