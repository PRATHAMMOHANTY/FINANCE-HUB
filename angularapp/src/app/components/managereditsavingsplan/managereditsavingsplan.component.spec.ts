import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { ManagereditsavingsplanComponent } from './managereditsavingsplan.component';

describe('ManagereditsavingsplanComponent', () => {
  let component: ManagereditsavingsplanComponent;
  let fixture: ComponentFixture<ManagereditsavingsplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagereditsavingsplanComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagereditsavingsplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_managereditsavingsplan_component', () => {
    expect(component).toBeTruthy();
  }
  );

  fit('Frontend_should_contain_savings_plan_heading_in_the_managereditsavingsplan_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Savings Plan');
  }
  );
});
