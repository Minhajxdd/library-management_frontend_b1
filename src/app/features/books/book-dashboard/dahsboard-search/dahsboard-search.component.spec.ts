import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DahsboardSearchComponent } from './dahsboard-search.component';

describe('DahsboardSearchComponent', () => {
  let component: DahsboardSearchComponent;
  let fixture: ComponentFixture<DahsboardSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DahsboardSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DahsboardSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
