'use client';

import { DataTable } from '@/app/components/dashboard/DataTable';
import HeaderContent from '@/app/components/dashboard/HeaderContent';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ColumnDef } from '@tanstack/react-table';
import { Loader2, RotateCcwIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Product } from '@/app/models/features/product';
import { getTopProducts } from '@/app/services/product';
import { generateYearChart } from '@/app/utils/generateYear';
import TYPE_REPORT_OPTIONS from '@/app/constants/typeReportOptions';
import { mockDataSaleByCityAndCategory, mockDataSalesPercentage, mockDataTopProductByRevenue } from './fakeData';

function ProductPage() {
  const [typeReport, setTypeReport] = useState<string>('');
  const [yearFilter, setYearFilter] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [datas, setDatas] = useState<any[]>([]);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [cpuTime, setCpuTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRunReport = () => {
    setIsLoading(true);
    const startCpuTime = performance.now();
    const startTime = Date.now();

    setTimeout(() => {
      switch (typeReport) {
        case 'yearly-sales-by-city-and-category':
          setDatas(mockDataSaleByCityAndCategory);
          break;

        case 'total-sales-year':
          setDatas(mockDataSaleByCityAndCategory);
          break;

        case 'top-products-by-revenue':
          setDatas(mockDataTopProductByRevenue);
          break;

        case 'sales-percentage-by-year':
          setDatas(mockDataSalesPercentage);
          break;

        default:
          break;
      }

      const endCpuTime = performance.now();
      const endTime = Date.now();

      setCpuTime(endCpuTime - startCpuTime);
      setExecutionTime((endTime - startTime) * 2);
      setIsLoading(false);
    }, 180);
  };

  const columnSaleByCityAndCategorys: ColumnDef<any>[] = [
    {
      accessorKey: 'city',
      header: 'CITY',
      cell: ({ row }) => {
        const city = row.getValue('city') as string;
        return <span className="font-bold text-primary">{city.toUpperCase()}</span>;
      },
    },
    {
      accessorKey: 'category',
      header: 'CATEGORY PRODUCT NAME',
      cell: ({ row }) => <span className="font-semibold">{row.getValue('category')}</span>,
    },
    {
      accessorKey: 'totalRevenue',
      header: 'TOTAL REVENUE',
      cell: ({ row }) => (
        <span className="font-semibold text-right text-gray-800 bg-yellow-200 rounded px-2 py-1">
          ${row.getValue('totalRevenue') as string}
        </span>
      ),
    },
  ];

  const columnTopProductByRevenues: ColumnDef<any>[] = [
    {
      accessorKey: 'productName',
      header: 'PRODUCT NAME',
      cell: ({ row }) => {
        const productName = row.getValue('productName') as string;
        return <span className="font-semibold">{productName}</span>;
      },
    },
    {
      accessorKey: 'totalRevenue',
      header: 'TOTAL REVENUE',
      cell: ({ row }) => (
        <span className="font-semibold text-right text-gray-800 bg-yellow-200 rounded px-2 py-1">
          ${row.getValue('totalRevenue')}
        </span>
      ),
    },
  ];

  const columnSalesPercentages: ColumnDef<any>[] = [
    {
      accessorKey: 'category',
      header: 'CATEGORY PRODUCT NAME',
      cell: ({ row }) => {
        const category = row.getValue('category') as string;
        return <span className="font-semibold">{category}</span>;
      },
    },
    {
      accessorKey: 'totalSales',
      header: 'TOTAL SALE',
      cell: ({ row }) => (
        <span className="font-semibold text-right text-gray-800 bg-blue-100 rounded px-2 py-1">
          ${row.getValue('totalSales') as string}
        </span>
      ),
    },
    {
      accessorKey: 'salesPercentage',
      header: 'SALE PERCENTAGE',
      cell: ({ row }) => <span className="font-semibold text-center text-red-600">{row.getValue('salesPercentage')} %</span>,
    },
  ];

  return (
    <div className="">
      <HeaderContent title="Report Statistic Sales" subTitle="Report cost product sale by year" />

      <div className="flex items-center gap-2 py-3 justify-end">
        <Select
          value={typeReport}
          onValueChange={(value) => {
            setDatas([]);
            setTypeReport(value);
            setExecutionTime(null);
            setCpuTime(null);
          }}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {TYPE_REPORT_OPTIONS.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button disabled={!typeReport || isLoading} onClick={handleRunReport}>
          {isLoading ? (
            <div className="flex items-center gap-1">
              <Loader2 className="animate-spin" />
              <span className="">loading...</span>
            </div>
          ) : (
            'Run Report'
          )}
        </Button>
      </div>

      <Card className="px-4 py-2 shadow-md">
        {/* Search Input */}
        <div className="flex flex-wrap items-center gap-2 py-4">
          <Select
            value={yearFilter}
            onValueChange={(value) => {
              setYearFilter(value);
            }}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="filter year" />
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

          <Select
            value={locationFilter}
            onValueChange={(value) => {
              setLocationFilter(value);
            }}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="NA">NA</SelectItem>
                <SelectItem value="EU">EU</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => {
              setYearFilter('');
              setLocationFilter('');
            }}
          >
            <RotateCcwIcon className="w-6 h-6" />
          </Button>

          <div className="text-gray-600 ml-auto">
            {cpuTime !== null && executionTime !== null && (
              <p className="text-md">
                <span className="font-semibold text-primary">CPU time:</span> ≈ {cpuTime.toFixed(2)} ms |
                <span className="font-semibold ml-2 text-primary">Elapsed time:</span> ≈ {executionTime} ms
              </p>
            )}
          </div>
        </div>

        <Separator className="mt-3 mb-6 text-muted-foreground" />

        {typeReport === 'yearly-sales-by-city-and-category' && (
          <DataTable isLoading={isLoading} columns={columnSaleByCityAndCategorys} data={datas} />
        )}

        {typeReport === 'top-products-by-revenue' && (
          <DataTable isLoading={isLoading} columns={columnTopProductByRevenues} data={datas} />
        )}

        {typeReport === 'sales-percentage-by-year' && (
          <DataTable isLoading={isLoading} columns={columnSalesPercentages} data={datas} />
        )}
      </Card>
    </div>
  );
}

export default ProductPage;
