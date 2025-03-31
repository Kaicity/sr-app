'use client';

import HeaderContent from '@/app/components/dashboard/HeaderContent';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcwIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { generateYearChart } from '@/app/utils/generateYear';
import { toast } from 'sonner';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { SubcategorySales } from '@/app/models/report';
import { Label } from '@/components/ui/label';

function TotalSaleSubCategoryPage() {
  const [yearFilter, setYearFilter] = useState<string>('2011');
  const [locationFilter, setLocationFilter] = useState<string>('na');
  const [datas, setDatas] = useState<SubcategorySales[]>([]);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [cpuTime, setCpuTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTopProductRevenue = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/report/${locationFilter}/total-sales-by-subcategory`, {
          params: {
            year: yearFilter,
          },
        });

        const { CPUTime, ElapsedTime } = response.data;
        setDatas(response?.data?.Data);

        setCpuTime(CPUTime);
        setExecutionTime(ElapsedTime);
      } catch (error: any) {
        toast.error(error.message || 'Lỗi thao tác dữ liệu');
      } finally {
        setIsLoading(false);
      }
    };

    if (yearFilter && locationFilter) {
      fetchTopProductRevenue();
    }
  }, [yearFilter, locationFilter]);

  return (
    <div className="">
      <HeaderContent title="Báo cáo thống kê sản phẩm" subTitle="Báo cáo thống kê sản phẩm hằng năm" />

      <Card className="px-4 py-2 shadow-md">
        <div className="flex flex-wrap items-center gap-2 py-4">
          <div className="flex flex-col gap-2">
            <Label>Năm</Label>
            <Select
              value={yearFilter}
              onValueChange={(value) => {
                setYearFilter(value);
              }}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Chọn năm" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {generateYearChart().map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Khu vực</Label>
            <Select
              value={locationFilter}
              onValueChange={(value) => {
                setLocationFilter(value);
              }}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Chọn vị trí" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ms">MS</SelectItem>
                  <SelectItem value="na">NA</SelectItem>
                  <SelectItem value="eu">EU</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            onClick={() => {
              setYearFilter('2011');
              setLocationFilter('na');
            }}
          >
            <RotateCcwIcon className="w-6 h-6" />
          </Button>

          <div className="text-gray-600 ml-auto">
            {cpuTime !== null && executionTime !== null && (
              <p className="text-md">
                <span className="font-semibold text-primary">CPU time:</span> ≈ {cpuTime} ms |
                <span className="font-semibold ml-2 text-primary">Elapsed time:</span> ≈ {executionTime} ms
              </p>
            )}
          </div>
        </div>

        {/* Biểu đồ */}
        <div className="mt-6 h-[400px] w-full">
          {isLoading ? (
            <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={datas} layout="vertical">
                <XAxis type="number" tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`} />
                <YAxis type="category" dataKey="Category" width={200} />
                <Tooltip formatter={(value) => `${Number(value).toLocaleString()} VND`} />
                <Bar dataKey="TotalSales" fill="#07689f" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </div>
  );
}

export default TotalSaleSubCategoryPage;
