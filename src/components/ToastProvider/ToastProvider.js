import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback(
    (variant, message) => {
      const newToast = {
        variant,
        message,
        id: crypto.randomUUID(),
      };

      const nextToasts = [...toasts, newToast];

      setToasts(nextToasts);
    },
    [toasts, setToasts]
  );

  const removeToast = React.useCallback(
    (id) => {
      const nextToasts = toasts.filter((toast) => toast.id !== id);
      setToasts(nextToasts);
    },
    [toasts, setToasts]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
