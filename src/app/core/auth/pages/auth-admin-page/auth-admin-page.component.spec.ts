import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAdminPageComponent } from './auth-admin-page.component';

describe('AuthAdminPageComponent', () => {
  let component: AuthAdminPageComponent;
  let fixture: ComponentFixture<AuthAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthAdminPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
