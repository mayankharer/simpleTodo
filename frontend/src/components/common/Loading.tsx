import React from 'react';
import { Loader2Icon } from 'lucide-react';
interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}
const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  return <div className="flex flex-col items-center justify-center p-4">
      <Loader2Icon className={`${sizeClasses[size]} text-blue-600 animate-spin`} />
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>;
};
export default Loading;