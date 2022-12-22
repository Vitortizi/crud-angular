import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

import { ClientDetailsComponent } from './client-details.component';
import { CarsService } from 'src/app/http/cars/cars.service';

describe('ClientDetailsComponent', () => {
  let component: ClientDetailsComponent;
  let fixture: ComponentFixture<ClientDetailsComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDetailsComponent ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it(`formulário deve ser inválido`, () => {
    component.userForm.controls['cpf'].setValue('');
    component.userForm.controls['telephone'].setValue('');
    component.userForm.controls['birth_date'].setValue('');
    expect(component.userForm.valid).toBeFalsy();
  });

  it(`submit deve ser válido`, () => {
    component.userForm.controls['cpf'].setValue('279.742.010-10');
    component.userForm.controls['telephone'].setValue('(11) 11111-1111');
    component.userForm.controls['birth_date'].setValue('2022-12-06');
    expect(component.userForm.valid).toBeTrue();
  });

  it(`cpf deve ser inválido`, () => {
    component.userForm.controls['cpf'].setValue('11122211122');
    expect(component.userForm.valid).toBeFalsy();
  });

  it(`cpf deve ser válido`, () => {
    component.userForm.controls['cpf'].setValue('279.742.010-10');
    expect(component.userForm.controls['cpf'].valid).toBeTrue();
  });

  it(`telephone deve ser inválido`, () => {
    component.userForm.controls['telephone'].setValue('112222');
    expect(component.userForm.valid).toBeFalsy();
  });

  it(`telephone deve ser válido`, () => {
    component.userForm.controls['telephone'].setValue('(11) 11111-1111');
    expect(component.userForm.controls['telephone'].valid).toBeTrue();
  });

  it(`birth_date deve ser inválido`, () => {
    component.userForm.controls['birth_date'].setValue('12');
    expect(component.userForm.valid).toBeFalsy();
  });

  it(`birth_date deve ser válido`, () => {
    component.userForm.controls['birth_date'].setValue('2022-12-06');
    expect(component.userForm.controls['birth_date'].valid).toBeTrue();
  });

  it(`submit deve ser inválido`, () => {
    component.addUser();
    expect(component.userForm.valid).toBeFalsy();
  });
});
