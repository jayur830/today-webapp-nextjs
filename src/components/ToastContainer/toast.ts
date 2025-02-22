import type { AlertColor } from '@mui/material/Alert/Alert';

export interface ToastOptions {
  duration: number;
}

const defaultToastOptions = {
  duration: 3000,
};

export interface ToastMessage {
  id: number;
  message: string;
  severity: AlertColor;
  duration: number;
}

type Listener = (toast: ToastMessage) => void;

class ToastManager {
  private listeners: Listener[] = [];
  private idCounter = 0;

  private notify(toast: ToastMessage) {
    this.listeners.forEach((listener) => listener(toast));
  }

  private createToast(message: string, severity: AlertColor, options: ToastOptions = defaultToastOptions) {
    const id = this.idCounter++;
    this.notify({
      id,
      message,
      severity,
      ...options,
    });
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  success(message: string, options?: ToastOptions) {
    this.createToast(message, 'success', options);
  }

  info(message: string, options?: ToastOptions) {
    this.createToast(message, 'info', options);
  }

  warn(message: string, options?: ToastOptions) {
    this.createToast(message, 'warning', options);
  }

  error(message: string, options?: ToastOptions) {
    this.createToast(message, 'error', options);
  }
}

export const toast = new ToastManager();
