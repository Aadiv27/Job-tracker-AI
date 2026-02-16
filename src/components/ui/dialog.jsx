import React from 'react';
import { X } from 'lucide-react';

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ children }) {
  return <div className="p-6">{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-bold text-gray-900">{children}</h2>;
}

export function DialogFooter({ children, className = '' }) {
  return <div className={`flex gap-2 mt-6 pt-4 border-t border-gray-200 ${className}`}>{children}</div>;
}
