import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { FabComponent } from './fab/fab.component';

@NgModule({
  declarations: [NavComponent, FooterComponent, FabComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild(),
  ],
  exports: [NavComponent, FooterComponent, FabComponent, CommonModule, FormsModule]
})
export class ComponentsModule { }