import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { imageFileValidator } from './add-books.utils';
import { ItemDetails } from './add-books.model';
import { AddBooksFormService } from './add-books-form.service';
import { AddBookService } from './add-books-data.service';

@Component({
  selector: 'app-add-books-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-books-form.component.html',
  styleUrls: ['./add-books-form.component.css'],
})
export class AddBooksFormComponent {
  private readonly addBooksFormService = inject(AddBooksFormService);
  private readonly destoryRef = inject(DestroyRef);
  private readonly addBookService = inject(AddBookService);

  quantityOptions = [1, 2, 3, 4, 5, 10, 20];
  itemForm: FormGroup;

  constructor(private fb: FormBuilder, private ele: ElementRef) {
    this.itemForm = this.fb.group({
      image: new FormControl<File | null>(null, {
        validators: [Validators.required, imageFileValidator],
      }),
      title: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      author: new FormControl<string>('', {
        validators: [Validators.required],
      }),
      description: new FormControl<string>(''),
      quantity: new FormControl<number>(1, {
        validators: [Validators.required, Validators.min(1)],
      }),
    });
  }

  get imageError(): string {
    const control = this.itemForm.get('image');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Image file is required';
      if (control.errors['invalidFile']) return 'Please select a valid file';
      if (control.errors['invalidImageType'])
        return 'Please select a valid image file';
    }
    return '';
  }

  get titleError(): string {
    const control = this.itemForm.get('title');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Title is required';
      if (control.errors['minlength'])
        return `Title must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }

  get authorError(): string {
    const control = this.itemForm.get('author');
    if (control?.touched && control?.errors && control.errors['required']) {
      return 'Author is required';
    }
    return '';
  }

  get quantityError(): string {
    const control = this.itemForm.get('quantity');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Quantity is required';
      if (control.errors['min']) return 'Quantity must be at least 1';
    }
    return '';
  }

  get isFormValid(): boolean {
    return this.itemForm.valid;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.itemForm.patchValue({ image: file });
      this.itemForm.get('image')?.markAsTouched();
    }
  }

  onSubmit(): void {
    this.itemForm.markAllAsTouched();
    if (this.itemForm.valid) {
      const formValue = this.itemForm.value as ItemDetails;

      const subscription = this.addBooksFormService
        .createBook(formValue)
        .subscribe({
          next: (data) => {
            this.addBookService.changeBook(data.data);
          },
          complete: () => {
            this.onTriggerClose();
          }
        });

      this.destoryRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      console.error('Form is invalid. Please fix the errors.');
    }
  }

  onClose = output();

  onTriggerClose() {
    this.onClose.emit();
    this.ele.nativeElement.remove();
  }
}
