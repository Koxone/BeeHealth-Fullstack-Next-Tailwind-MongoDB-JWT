import {
  LayoutDashboard,
  Activity,
  Calendar,
  Apple,
  Dumbbell,
  User,
  HelpCircle,
  Users,
  DollarSign,
  Package,
  FileText,
} from 'lucide-react';

export const patientSidebarItems = [
  { icon: LayoutDashboard, label: 'sidebar.home', path: '/patient/dashboard', badge: null },
  { icon: Calendar, label: 'sidebar.newAppointment', path: '/patient/new-appointment', badge: null },
  { icon: Activity, label: 'sidebar.myHistory', path: '/patient/history', badge: null },
  { icon: Apple, label: 'sidebar.myDiets', path: '/patient/diets', badge: null },
  { icon: Dumbbell, label: 'sidebar.myWorkouts', path: '/patient/workouts', badge: null },
];

export const weightControlSidebarItems = [
  { icon: LayoutDashboard, label: 'sidebar.home', path: '/doctor/dashboard', badge: null },
  {
    icon: Users,
    label: 'sidebar.patients',
    path: '/doctor/patients',
    badge: '0',
  },
  {
    icon: Calendar,
    label: 'sidebar.calendar',
    path: '/doctor/calendar',
    badge: '0',
  },
  { icon: Apple, label: 'sidebar.diets', path: '/doctor/diets', badge: null },
  { icon: Dumbbell, label: 'sidebar.workouts', path: '/doctor/workouts', badge: null },
  { icon: DollarSign, label: 'sidebar.accounting', path: '/doctor/accounting', badge: null },
  { icon: Package, label: 'sidebar.inventory', path: '/doctor/inventory', badge: '5' },
  // { icon: User, label: 'sidebar.profile', path: '/doctor/profile', badge: null },
];

export const dentalSidebarItems = [
  { icon: LayoutDashboard, label: 'sidebar.home', path: '/doctor/dashboard', badge: null },
  {
    icon: Users,
    label: 'sidebar.patients',
    path: '/doctor/patients',
    badge: '0',
  },
  {
    icon: Calendar,
    label: 'sidebar.calendar',
    path: '/doctor/calendar',
    badge: '0',
  },
  { icon: DollarSign, label: 'sidebar.accounting', path: '/doctor/accounting', badge: null },
  { icon: Package, label: 'sidebar.inventory', path: '/doctor/inventory', badge: '5' },
  { icon: User, label: 'sidebar.profile', path: '/doctor/profile', badge: null },
];

export const employeeSidebarItems = [
  { icon: LayoutDashboard, label: 'sidebar.home', path: '/employee/dashboard', badge: null },
  { icon: Calendar, label: 'sidebar.appointments', path: '/employee/appointments', badge: '12' },
  { icon: FileText, label: 'sidebar.consultations', path: '/employee/consultations', badge: null },
  { icon: Package, label: 'sidebar.inventory', path: '/employee/inventory', badge: '3' },
  { icon: Users, label: 'sidebar.patients', path: '/employee/patients', badge: null },
  { icon: User, label: 'sidebar.profile', path: '/employee/profile', badge: null },
];
