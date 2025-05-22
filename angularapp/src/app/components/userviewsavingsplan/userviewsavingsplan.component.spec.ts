import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { UserviewsavingsplanComponent } from './userviewsavingsplan.component';

describe('UserviewsavingsplanComponent', () => {
  let component: UserviewsavingsplanComponent;
  let fixture: ComponentFixture<UserviewsavingsplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserviewsavingsplanComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewsavingsplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_userviewsavingsplan_component', () => {
    expect(component).toBeTruthy();
  }
  );

  fit('Frontend_should_contain_savings_heading_in_the_userviewsavingsplan_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Savings');
  }
  );
});
