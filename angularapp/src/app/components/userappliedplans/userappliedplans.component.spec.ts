import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { UserappliedplansComponent } from './userappliedplans.component';

describe('UserappliedplansComponent', () => {
  let component: UserappliedplansComponent;
  let fixture: ComponentFixture<UserappliedplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserappliedplansComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserappliedplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_userappliedplans_component', () => {
    expect(component).toBeTruthy();
  }
  );

  fit('Frontend_should_contain_plan_heading_in_the_userappliedplans_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Plan');
  }
  );
});
