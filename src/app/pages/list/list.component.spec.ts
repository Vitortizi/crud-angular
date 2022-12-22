import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ListComponent } from './list.component';

describe('List Users', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientModule
      ]
    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it(`a quantidade de usuário deve ser vazio`, () => {
    expect(component.users.length).toEqual(0);
  });

  it(`a quantidade de usuário deve ser = 1`, () => {
    component.users = [
      {
        "name": "VITOR",
        "cpf": "94148408005",
        "telephone": "65465464565",
        "birth_date": "2022-12-06",
        "address": "aaaaaaaaaaa",
        "brandVehicle": "189",
        "modelVehicle": "6906",
        "createdAt": "2022-12-21T00:24:10.620Z",
        "updatedAt": "2022-12-21T01:06:00.960Z",
        "vehicle": {
          "brandVehicle": {
            "nome": "ASTON MARTIN",
            "codigo": "189"
          },
          "modelVehicle": {
            "nome": "DB9 Coupe 6.0 V12 510cv",
            "codigo": 6906
          }
        },
        "userId": "15ed10ea-0606-48d8-9c12-dfe4a3d3262c"
      }
    ];

    expect(component.users.length).toEqual(1);
  });
});
