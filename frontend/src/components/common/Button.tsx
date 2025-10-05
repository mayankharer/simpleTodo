import React from 'react';
import { Loader2Icon } from 'lucide-react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    outline: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-blue-500'
  };
  const sizeStyles = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  const disabledStyles = 'opacity-50 cursor-not-allowed';
  const buttonStyles = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${disabled || isLoading ? disabledStyles : ''}
    ${className}
  `;
  return <button className={buttonStyles} disabled={disabled || isLoading} {...props}>
      {isLoading ? <>
          <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
          <span>{children}</span>
        </> : <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>}
    </button>;
};
export default Button;