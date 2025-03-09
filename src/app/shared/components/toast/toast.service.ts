import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  action?: {
    label: string;
    callback: () => void;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<Toast[]>([]);
  
  show(toast: Omit<Toast, 'id'>): string {
    const id = crypto.randomUUID();
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 5000
    };
    
    this.toasts.update(currentToasts => [...currentToasts, newToast]);
    
    if (newToast?.duration > 0) {
      setTimeout(() => this.dismiss(id), newToast.duration);
    }
    
    return id;
  }
  
  dismiss(id: string): void {
    this.toasts.update(currentToasts => 
      currentToasts.filter(toast => toast.id !== id)
    );
  }
  
  dismissAll(): void {
    this.toasts.set([]);
  }
  
  success(message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'type'>>): string {
    return this.show({ message, type: 'success', ...options });
  }
  
  error(message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'type'>>): string {
    return this.show({ message, type: 'error', ...options });
  }
  
  info(message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'type'>>): string {
    return this.show({ message, type: 'info', ...options });
  }
  
  warning(message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'type'>>): string {
    return this.show({ message, type: 'warning', ...options });
  }
}