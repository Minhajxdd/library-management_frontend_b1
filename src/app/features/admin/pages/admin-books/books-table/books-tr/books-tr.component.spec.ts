import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksTrComponent } from './books-tr.component';

describe('BooksTrComponent', () => {
  let component: BooksTrComponent;
  let fixture: ComponentFixture<BooksTrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksTrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
