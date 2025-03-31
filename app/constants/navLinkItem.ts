import { Box, Home, ListOrdered } from 'lucide-react';
import type NavLink from '../models/nav-link.type';

// Dữ liệu navLinks
export const navLinks: NavLink[] = [
  {
    path: '/dashboard/statistic-report-sales-percentage',
    label: 'Tổng Doanh Thu Theo Năm',
    icon: Box,
    isActive: false,
    group: 'statistic',
    children: [],
  },
  {
    path: '/dashboard/statistic-report',
    label: 'Top 10 Sản Phẩm Có Doanh Thu Cao Nhất',
    icon: Box,
    isActive: false,
    group: 'statistic',
    children: [],
  },
  {
    path: '/dashboard/statistic-report',
    label: 'Tổng Doanh Thu Trong Năm',
    icon: Box,
    isActive: false,
    group: 'statistic',
    children: [],
  },
  {
    path: '/dashboard/statistic-report',
    label: 'Doanh Thu Theo Thành Phố Và Danh Mục',
    icon: Box,
    isActive: false,
    group: 'statistic',
    children: [],
  },
  {
    path: '/dashboard/order',
    label: 'Đơn Hàng',
    icon: ListOrdered,
    isActive: false,
    children: [],
    group: 'order',
  },
];
