import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckIfPrivateKeyComponent } from './check-if-private-key.component';

describe('CheckIfPrivateKeyComponent', () => {
  let component: CheckIfPrivateKeyComponent;
  let fixture: ComponentFixture<CheckIfPrivateKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckIfPrivateKeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckIfPrivateKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
