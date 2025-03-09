import { Component, ElementRef, inject, input, output } from '@angular/core';

@Component({
  selector: 'app-book-due-form',
  imports: [],
  templateUrl: './book-due-form.component.html',
  styleUrl: './book-due-form.component.css'
})
export class BookDueFormComponent {
  bookId = input.required<string>()
  onClose = output<boolean>();

  private readonly ele = inject(ElementRef);

  onToggleClose() {
    this.onClose.emit(false);
    this.ele.nativeElement.remove()
  }

}
