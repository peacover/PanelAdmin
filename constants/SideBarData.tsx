import { TSideNavItem } from '@/lib/types/TSideNavItems';
import { Icon } from '@iconify/react';

export const SIDENAV_ITEMS: TSideNavItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <Icon icon="radix-icons:dashboard" width="24" height="24" />,
    // icon: <Icon icon="carbon:home" width="24" height="24" />,
  },
  {
    title: 'Business',
    path: '/dashboard/businessManagement',
    icon: <Icon icon="mdi:business-card-outline" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Dashboard', path: '/dashboard/businessManagement' },
      { title: 'Add Business', path: '/dashboard/businessManagement/addBusiness' },
    ],
  },
  {
    title: 'Users',
    path: '/dashboard/adminManagement',
    icon: <Icon icon="la:users-cog" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Dashboard', path: '/dashboard/adminManagement' },
      { title: 'Add User', path: '/dashboard/adminManagement/addUser' },
    ],
  },
];