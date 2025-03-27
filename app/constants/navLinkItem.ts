import { Box, Home, ListOrdered } from 'lucide-react';
import type NavLink from '../models/nav-link.type';

// Dữ liệu navLinks
export const navLinks: NavLink[] = [
  {
    path: '/dashboard/statistic-report',
    label: 'Statistic Report',
    icon: Box,
    isActive: false,
    group: 'statistic',
    children: [],
  },
  {
    path: '/dashboard/order',
    label: 'Order',
    icon: ListOrdered,
    isActive: false,
    children: [],
    group: 'order',
  },
];
