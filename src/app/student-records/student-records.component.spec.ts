import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRecordsComponent } from './student-records.component';

describe('StudentRecordsComponent', () => {
  let component: StudentRecordsComponent;
  let fixture: ComponentFixture<StudentRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudentRecordsComponent]
    });
    fixture = TestBed.createComponent(StudentRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
