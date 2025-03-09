import { Component, inject, computed, effect } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { ToastService, Toast } from './toast.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  animations: [
    trigger('toastAnimation', [
      state(
        'void',
        style({
          transform: 'translateY(100%)',
          opacity: 0,
        })
      ),
      state(
        'visible',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      transition('void => visible', animate('300ms ease-out')),
      transition('visible => void', animate('200ms ease-in')),
    ]),
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  private toastService = inject(ToastService);
  toasts = this.toastService.toasts;

  dismissToast(id: string): void {
    this.toastService.dismiss(id);
  }

  handleAction(toast: Toast): void {
    if (toast.action) {
      toast.action.callback();
      this.dismissToast(toast.id);
    }
  }
}
