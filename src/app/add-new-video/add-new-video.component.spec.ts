import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewVideoComponent } from './add-new-video.component';

describe('AddNewVideoComponent', () => {
  let component: AddNewVideoComponent;
  let fixture: ComponentFixture<AddNewVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
