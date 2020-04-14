import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LmpComponent } from './lmp.component';

describe('LmpComponent', () => {
  let component: LmpComponent;
  let fixture: ComponentFixture<LmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
