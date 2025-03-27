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
import { fakeOrders } from './fakeData';

function OrderPage() {
  const [yearFilter, setYearFilter] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [datas, setDatas] = useState<any[]>([]);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [cpuTime, setCpuTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrders = () => {
      setDatas(fakeOrders);
    };

    fetchOrders();
  });

  const columnOrders: ColumnDef<any>[] = [
    {
      accessorKey: 'orderId',
      header: 'Order ID',
    },
    {
      accessorKey: 'customerName',
      header: 'Customer Name',
    },
    {
      accessorKey: 'orderDate',
      header: 'Order Date',
    },
    {
      accessorKey: 'totalAmount',
      header: 'Total Amount ($)',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
  ];

  return (
    <div className="">
      <HeaderContent title="Orders List" subTitle="Displayed orders list here" />

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
        </div>

        <Separator className="mt-3 mb-6 text-muted-foreground" />

        <DataTable isLoading={isLoading} columns={columnOrders} data={fakeOrders} />
      </Card>
    </div>
  );
}

export default OrderPage;
