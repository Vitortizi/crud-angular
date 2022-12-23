import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { CpfValidator } from 'src/app/helpers/cpf.validator';
import { CarsService } from 'src/app/http/cars/cars.service';
import { ClientsService } from 'src/app/http/clients/clients.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  get validForm() {
    return this.userForm;
  }

  user: any = [];
  hasData: boolean = false;

  carsBrand: any = [];
  carsModel: any = [];
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private translate: TranslateService, public carsApi: CarsService, public clientsApi: ClientsService, private toastr: ToastrService) {
    this.userForm = this.formBuilder.group({
      name: ['', []],
      cpf: ['', [Validators.required, CpfValidator.validate, Validators.minLength(11)]],
      telephone: ['', [Validators.required, Validators.minLength(11)]],
      birth_date: ['', [Validators.required]],
      address: ['', []],
      brandVehicle: ['', []],
      modelVehicle: [{ value: '', disabled: true }],
      createdAt: [],
      updatedAt: [],
    });
  }

  ngOnInit() {
    // PEGAR TODAS MARCAS DE CARROS.
    this.carsApi.getCarBrand().subscribe((res) => {
      this.carsBrand = res;
    });

    // PEGAR DADOS ENVIADO PELA queryParams NA ROTA CRIADA.
    this.route.queryParams.subscribe((res: any) => {
      if (res.data) {
        const obj = JSON.parse(res.data);

        this.user = obj;
        this.hasData = true;

        this.userForm.controls['name'].setValue(obj.name);
        this.userForm.controls['cpf'].setValue(obj.cpf);
        this.userForm.controls['telephone'].setValue(obj.telephone);
        this.userForm.controls['birth_date'].setValue(obj.birth_date);
        this.userForm.controls['address'].setValue(obj.address);
        this.userForm.controls['brandVehicle'].setValue(obj.brandVehicle);

        this.getCarModel(obj.brandVehicle);
        this.userForm.controls['modelVehicle'].setValue(obj.modelVehicle);

        this.userForm.controls['createdAt'].setValue(obj.createdAt);
        this.userForm.controls['updatedAt'].setValue(obj.updatedAt);
      }
    });
  }

  // PEGAR TODAS MODELOS DE CARROS.
  getCarModel(brandId: any) {
    if (brandId) {
      this.carsApi.getCarModel(brandId).subscribe((res) => {
        this.carsModel = res.modelos;
        this.userForm.get('modelVehicle')?.enable()
      });
    }
  }

  addUser() {
    if (this.validForm.status == "INVALID") {
      this.translate.get('toastr.mandatory_fields_toastr').subscribe(res => {
        this.toastr.warning(res);
      });
      return;
    }

    this.clientsApi.addUser({
      ...this.userForm.value,
      vehicle: {
        brandVehicle: this.getBrandVehicleData(this.userForm.get('brandVehicle')?.value)[0],
        modelVehicle: this.getModelVehicleData(this.userForm.get('modelVehicle')?.value)[0]
      }
    }).then(res => {
      this.translate.get('toastr.created_toastr').subscribe(res => {
        this.toastr.success(res);
      });

      this.router.navigate(['/home']);
    });
  }

  putUser() {
    if (this.validForm.status == "INVALID") {
      this.translate.get('toastr.mandatory_fields_toastr').subscribe(res => {
        this.toastr.warning(res);
      });
      return;
    }

    this.clientsApi.putUser(this.user.userId, {
      ...this.userForm.value,
      vehicle: {
        brandVehicle: this.getBrandVehicleData(this.userForm.get('brandVehicle')?.value)[0],
        modelVehicle: this.getModelVehicleData(this.userForm.get('modelVehicle')?.value)[0]
      }
    }).then(res => {
      this.translate.get('toastr.update_toastr').subscribe(res => {
        this.toastr.success(res);
      });

      this.router.navigate(['/home']);
    });
  }

  // BUSCA TODOS DADOS DA MARCA DO VEICULO
  getBrandVehicleData(_id: any) {
    return this.carsBrand.filter(
      (el: any) => el.codigo == _id
    );
  }

  // BUSCA TODOS DADOS DO MODELO DO VEICULO
  getModelVehicleData(_id: any) {
    return this.carsModel.filter(
      (el: any) => el.codigo == _id
    );
  }
}
