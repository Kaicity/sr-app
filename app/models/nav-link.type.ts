// Định nghĩa interface cho NavLink

export default interface NavLink {
  path: string;
  label: string;
  icon?: React.ElementType;
  group: 'statistic' | 'order';
  isActive: boolean;
  children?: NavLink[];
}
