import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidetaskComponent } from './sidetask.component';

describe('SidetaskComponent', () => {
  let component: SidetaskComponent;
  let fixture: ComponentFixture<SidetaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidetaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidetaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
