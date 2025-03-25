import { Home, Users2 } from 'lucide-react';
import type NavLink from '../models/nav-link.type';

// Dữ liệu navLinks
export const navLinks: NavLink[] = [
  {
    path: '/dashboard',
    label: 'Trang Chủ',
    icon: Home,
    isActive: false,
    children: [],
    group: 'main',
  },
  {
    path: '/dashboard/human-resource',
    label: 'Nhân Sự',
    icon: Users2,
    isActive: false,
    group: 'management',
    children: [],
  },
];
