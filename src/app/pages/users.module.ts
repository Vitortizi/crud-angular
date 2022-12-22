import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClientDetailsComponent } from './client-details/client-details.component';
import { ListComponent } from './list/list.component';

import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ClientDetailsComponent, ListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  exports:  [ClientDetailsComponent, ListComponent, CommonModule, FormsModule]
})
export class UsersModule { }