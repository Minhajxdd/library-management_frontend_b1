import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookDueFormService } from './book-due-form.service';

@Component({
  selector: 'app-book-due-form',
  imports: [ReactiveFormsModule],
  templateUrl: './book-due-form.component.html',
  styleUrl: './book-due-form.component.css',
})
export class BookDueFormComponent {
  bookId = input.required<string>();
  onClose = output<boolean>();

  private readonly ele = inject(ElementRef);
  private readonly bookDueFormService = inject(BookDueFormService);
  private readonly destoryRef = inject(DestroyRef);

  dateForm: FormGroup;
  minDate: string;

  constructor(private fb: FormBuilder) {
    this.minDate = new Date().toISOString().split('T')[0];

    this.dateForm = this.fb.group({
      date: ['', [Validators.required, this.dateValidator]],
    });
  }

  dateValidator(control: AbstractControl): { [key: string]: any } | null {
    if (!control.value) {
      return null;
    }
    const selectedDate = new Date(control.value);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return { pastDate: 'Past dates are not allowed.' };
    }

    const thirtyDaysLater = new Date(today);
    thirtyDaysLater.setDate(today.getDate() + 30);

    if (selectedDate > thirtyDaysLater) {
      return {
        dateOutOfRange: 'Please select a date within 30 days from today.',
      };
    }
    return null;
  }

  onSubmit() {
    if (this.dateForm.valid) {
      const date: string = this.dateForm.value.date;

      this.borrowBook(date);
    } else {
      console.log('Form is invalid:', this.dateForm.errors);
      this.dateForm.markAllAsTouched();
    }
  }

  borrowBook(date: string) {
    const subscription = this.bookDueFormService
      .borrowBook(this.bookId(), date)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        complete: () => {
          this.onToggleClose();
        }
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onToggleClose() {
    this.onClose.emit(false);
    this.ele.nativeElement.remove();
  }
}
