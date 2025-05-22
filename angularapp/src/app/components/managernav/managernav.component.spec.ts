import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagernavComponent } from './managernav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManagernavComponent', () => {
  let component: ManagernavComponent;
  let fixture: ComponentFixture<ManagernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagernavComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_managernav_component', () => {
    expect(component).toBeTruthy();
  }
  );

  
});
