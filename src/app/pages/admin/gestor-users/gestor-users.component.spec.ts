import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorUsersComponent } from './gestor-users.component';

describe('GestorUsersComponent', () => {
  let component: GestorUsersComponent;
  let fixture: ComponentFixture<GestorUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorUsersComponent]
    });
    fixture = TestBed.createComponent(GestorUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
