import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { ManagerviewsavingsplanComponent } from './managerviewsavingsplan.component';

describe('ManagerviewsavingsplanComponent', () => {
  let component: ManagerviewsavingsplanComponent;
  let fixture: ComponentFixture<ManagerviewsavingsplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerviewsavingsplanComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerviewsavingsplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_managerviewsavingsplan_component', () => {
    expect(component).toBeTruthy();
  }
  );

});
