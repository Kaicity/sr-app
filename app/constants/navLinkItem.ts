import { Box, Home, Users2 } from 'lucide-react';
import type NavLink from '../models/nav-link.type';

// Dữ liệu navLinks
export const navLinks: NavLink[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: Home,
    isActive: false,
    children: [],
    group: 'main',
  },
  {
    path: '/dashboard/statistic-report',
    label: 'Báo Cáo Thống Kê',
    icon: Box,
    isActive: false,
    group: 'management',
    children: [],
  },
];
