import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserplanapplicationformComponent } from './userplanapplicationform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserplanapplicationformComponent', () => {
  let component: UserplanapplicationformComponent;
  let fixture: ComponentFixture<UserplanapplicationformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserplanapplicationformComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserplanapplicationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_userplanapplicationform_component', () => {
    expect(component).toBeTruthy();
  }
  );

  fit('Frontend_should_contain_application_form_heading_in_the_userplanapplicationform_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Application Form');
  }
  );
});
