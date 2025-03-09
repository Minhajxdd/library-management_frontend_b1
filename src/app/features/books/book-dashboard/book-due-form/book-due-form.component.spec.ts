import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDueFormComponent } from './book-due-form.component';

describe('BookDueFormComponent', () => {
  let component: BookDueFormComponent;
  let fixture: ComponentFixture<BookDueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDueFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
