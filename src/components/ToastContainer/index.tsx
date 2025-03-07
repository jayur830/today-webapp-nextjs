'use client';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';

import type { ToastMessage } from './toast';
import { toast } from './toast';

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    return toast.subscribe((newToast) => {
      setToasts((prevToasts) => [...prevToasts, newToast]);
    });
  }, []);

  const handleClose = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return toasts.map((toastItem) => (
    <Snackbar
      key={toastItem.id}
      open
      autoHideDuration={toastItem.duration}
      onClose={() => handleClose(toastItem.id)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Alert onClose={() => handleClose(toastItem.id)} severity={toastItem.severity} variant="standard">
        {toastItem.message}
      </Alert>
    </Snackbar>
  ));
}
