'use client';

import { DataTable } from '@/app/components/dashboard/DataTable';
import HeaderContent from '@/app/components/dashboard/HeaderContent';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye, RotateCcwIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { generateYearChart } from '@/app/utils/generateYear';
import { toast } from 'sonner';
import axios from 'axios';
import type { SalesOrder } from '@/app/models/order';
import { useRouter } from 'next/navigation';
import OrderStatusDialog from '@/app/components/order/modal';

function OrderPage() {
  const router = useRouter();

  const [yearFilter, setYearFilter] = useState<string>('2011');
  const [locationFilter, setLocationFilter] = useState<string>('NA');
  const [orders, setOrders] = useState<SalesOrder[]>([]);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [cpuTime, setCpuTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<'ms' | 'na' | 'eu' | null>(null);

  const handleOpenDialog = (orderId: number, location: 'ms' | 'na' | 'eu') => {
    setSelectedOrderId(orderId);
    setSelectedLocation(location);
    setIsDialogOpen(true);
  };

  const getOrderStatusLabel = (status: number) => {
    switch (status) {
      case 1:
        return <span className="text-blue-500 font-medium">In Process</span>;
      case 2:
        return <span className="text-green-500 font-medium">Approved</span>;
      case 3:
        return <span className="text-yellow-500 font-medium">Backordered</span>;
      case 4:
        return <span className="text-red-500 font-medium">Rejected</span>;
      case 5:
        return <span className="text-purple-500 font-medium">Shipped</span>;
      case 6:
        return <span className="text-gray-500 font-medium">Cancelled</span>;
      default:
        return <span className="text-gray-400">Unknown</span>;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/order/${locationFilter}`, {
          params: { year: yearFilter },
        });

        console.log(response);

        const { CPUTime, ElapsedTime, Orders } = response.data;

        setOrders(Orders || []); // Đảm bảo luôn có dữ liệu mảng
        setCpuTime(CPUTime);
        setExecutionTime(ElapsedTime);
      } catch (error: any) {
        toast.error(error.message || 'Lỗi thao tác dữ liệu');
      } finally {
        setIsLoading(false);
      }
    };

    if (yearFilter && locationFilter) {
      fetchOrders();
    }
  }, [yearFilter, locationFilter]);

  const columnOrders: ColumnDef<SalesOrder>[] = [
    {
      accessorKey: 'SalesOrderID',
      header: 'Order ID',
    },
    {
      accessorKey: 'CustomerID',
      header: 'Customer ID',
    },
    {
      accessorKey: 'OrderDate',
      header: 'Order Date',
      cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
    },
    {
      accessorKey: 'TotalDue',
      header: 'Total Amount (VND)',
      cell: ({ row }) => {
        const monmey = row.getValue('TotalDue') as number;
        return <span>{monmey && monmey.toLocaleString()}</span>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => getOrderStatusLabel(row.original.Status),
    },
    {
      accessorKey: 'ACTION',

      cell: ({ row }) => (
        <button
          onClick={() => router.push(`/dashboard/order-detail/${row.original.SalesOrderID}`)}
          className="text-blue-600 hover:underline"
        >
          <Eye />
        </button>
      ),
    },
  ];

  return (
    <div className="">
      <HeaderContent title="Danh sách đơn hàng" subTitle="Hiển thị danh sách đơn hàng tại đây" />

      <Card className="px-4 py-2 shadow-md">
        {/* Bộ lọc */}
        <div className="flex flex-wrap items-center gap-2 py-4">
          <Select value={yearFilter} onValueChange={(value) => setYearFilter(value)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter Year" />
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

          <Select value={locationFilter} onValueChange={(value) => setLocationFilter(value)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter Location" />
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
              setYearFilter('2011');
              setLocationFilter('NA');
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

        <Separator className="mt-3 mb-6 text-muted-foreground" />

        <Button onClick={() => setIsDialogOpen(true)}>Tạo</Button>

        <DataTable isLoading={isLoading} columns={columnOrders} data={orders} />
      </Card>

      {isDialogOpen && (
        <OrderStatusDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          orderId={selectedOrderId!}
          location={selectedLocation!}
        />
      )}
    </div>
  );
}

export default OrderPage;
