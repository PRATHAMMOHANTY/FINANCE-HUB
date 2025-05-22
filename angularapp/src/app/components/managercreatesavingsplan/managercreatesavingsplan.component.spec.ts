import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { ManagercreatesavingsplanComponent } from './managercreatesavingsplan.component';

describe('ManagercreatesavingsplanComponent', () => {
  let component: ManagercreatesavingsplanComponent;
  let fixture: ComponentFixture<ManagercreatesavingsplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagercreatesavingsplanComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagercreatesavingsplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_managercreatesavingsplan_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_savings_plan_heading_in_the_managercreatesavingsplan_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Savings Plan');
  });
});
