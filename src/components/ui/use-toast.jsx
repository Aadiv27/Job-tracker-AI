// Simple toast notification system
let toastCallbacks = [];

export function useToast() {
  const toast = ({ title = '', description = '', variant = 'default' }) => {
    const id = Date.now();
    const toastData = { id, title, description, variant };
    
    // Call all registered callbacks
    toastCallbacks.forEach(callback => callback(toastData));

    // Auto-remove after 3 seconds
    setTimeout(() => {
      toastCallbacks.forEach(callback => callback({ id, remove: true }));
    }, 3000);
  };

  return { toast };
}

// Subscribe to toast events (internal use)
export function onToast(callback) {
  toastCallbacks.push(callback);
  return () => {
    toastCallbacks = toastCallbacks.filter(cb => cb !== callback);
  };
}

// For direct import usage
export const toast = ({ title = '', description = '', variant = 'default' }) => {
  const id = Date.now();
  const toastData = { id, title, description, variant };
  
  toastCallbacks.forEach(callback => callback(toastData));

  setTimeout(() => {
    toastCallbacks.forEach(callback => callback({ id, remove: true }));
  }, 3000);
};
