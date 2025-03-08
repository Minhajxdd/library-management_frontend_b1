import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBooksFormComponent } from './add-books-form.component';

describe('AddBooksFormComponent', () => {
  let component: AddBooksFormComponent;
  let fixture: ComponentFixture<AddBooksFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBooksFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBooksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
