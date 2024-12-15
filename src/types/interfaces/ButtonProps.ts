export interface ButtonProps {
  onClick?: () => void;
  onDoubleClick?: () => void;
  label: string;
  className?: string;
  variant?: 'add' | 'remove';
}
