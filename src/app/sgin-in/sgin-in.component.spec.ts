import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SginINComponent } from './sgin-in.component';

describe('SginINComponent', () => {
  let component: SginINComponent;
  let fixture: ComponentFixture<SginINComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SginINComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SginINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
