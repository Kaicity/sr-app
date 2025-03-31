'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface OrderDetail {
  CustomerID: number;
  CustomerName: string;
  OrderDate: string;
  ProductID: number;
  ProductName: string;
  OrderQty: number;
  UnitPrice: number;
  LineTotal: number;
  TotalDue: number;
  Status: number;
}

const OrderDetailPage = () => {
  const params = useParams();
  const [orderDetail, setOrderDetail] = useState<OrderDetail>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/order/na/${params?.id}`);

        setOrderDetail(response?.data?.data?.orderDetails[0]);
      } catch (error: any) {
        toast.error(error.message || 'Lỗi thao tác dữ liệu');
      } finally {
        setIsLoading(false);
      }
    };

    if (params?.id) {
      fetchOrderDetail();
    }
  }, [params?.id]);

  const getOrderStatusLabel = (status: number) => {
    switch (status) {
      case 1:
        return <span className="text-blue-500 font-semibold">In Process</span>;
      case 2:
        return <span className="text-green-500 font-semibold">Approved</span>;
      case 3:
        return <span className="text-yellow-500 font-semibold">Backordered</span>;
      case 4:
        return <span className="text-red-500 font-semibold">Rejected</span>;
      case 5:
        return <span className="text-purple-500 font-semibold">Shipped</span>;
      case 6:
        return <span className="text-gray-500 font-semibold">Cancelled</span>;
      default:
        return <span className="text-gray-400">Unknown</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Skeleton className="w-96 h-10 mb-4" />
        <Skeleton className="w-80 h-8 mb-2" />
        <Skeleton className="w-72 h-8 mb-2" />
        <Skeleton className="w-64 h-8 mb-2" />
      </div>
    );
  }

  if (!orderDetail) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        <p>Không tìm thấy đơn hàng.</p>
        <Button className="mt-4" onClick={() => window.history.back()}>
          Quay lại
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Chi tiết đơn hàng #{params?.id}</h1>

      <Card className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Khách hàng:</span>
            <span className="font-semibold">{orderDetail.CustomerName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Ngày đặt hàng:</span>
            <span className="font-semibold">{new Date(orderDetail.OrderDate).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Sản phẩm:</span>
            <span className="font-semibold">{orderDetail.ProductName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Số lượng:</span>
            <span className="font-semibold">{orderDetail.OrderQty}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Giá đơn vị:</span>
            <span className="font-semibold">${orderDetail.UnitPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Tổng tiền:</span>
            <span className="font-semibold text-green-600">${orderDetail.TotalDue.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Trạng thái:</span>
            {getOrderStatusLabel(orderDetail.Status)}
          </div>
        </div>
      </Card>

      <Button variant="outline" className="mt-6" onClick={() => window.history.back()}>
        Quay lại danh sách
      </Button>
    </div>
  );
};

export default OrderDetailPage;
