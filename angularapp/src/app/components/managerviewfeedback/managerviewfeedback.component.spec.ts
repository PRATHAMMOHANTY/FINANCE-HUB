import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerviewfeedbackComponent } from './managerviewfeedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManagerviewfeedbackComponent', () => {
  let component: ManagerviewfeedbackComponent;
  let fixture: ComponentFixture<ManagerviewfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerviewfeedbackComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerviewfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_adminviewfeedback_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_feedback_details_heading_in_the_adminviewfeedback_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Feedback Details');
  });
});
