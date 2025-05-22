import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { ManagerviewapplicationformComponent } from './managerviewapplicationform.component';

describe('ManagerviewapplicationformComponent', () => {
  let component: ManagerviewapplicationformComponent;
  let fixture: ComponentFixture<ManagerviewapplicationformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerviewapplicationformComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerviewapplicationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_managerviewapplicationform_component', () => {
    expect(component).toBeTruthy();
  }
  );

  // fit('Frontend_should_contain_application_form_heading_in_the_managerviewapplicationform_component', () => {
  //   const componentHTML = fixture.debugElement.nativeElement.outerHTML;
  //   expect(componentHTML).toContain('Application Form');
  // }
  // );
});
