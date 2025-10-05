import React, { useRef, Fragment } from 'react';
import { XIcon } from 'lucide-react';
import Button from './Button';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  if (!isOpen) return null;
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg'
  };
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  return <Fragment>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={handleBackdropClick} aria-modal="true" role="dialog">
        <div ref={modalRef} className={`${sizeClasses[size]} w-full bg-white rounded-lg shadow-xl transform transition-all`} onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Close modal">
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">{children}</div>
          {footer && <div className="p-4 border-t">{footer}</div>}
        </div>
      </div>
    </Fragment>;
};
export default Modal;