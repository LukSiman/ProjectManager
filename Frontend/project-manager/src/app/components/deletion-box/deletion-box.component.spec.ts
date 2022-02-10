import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletionBoxComponent } from './deletion-box.component';

describe('DeletionBoxComponent', () => {
  let component: DeletionBoxComponent;
  let fixture: ComponentFixture<DeletionBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletionBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
