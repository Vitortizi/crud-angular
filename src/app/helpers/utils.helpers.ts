import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(private translate: TranslateService) { }

  formatDate(date: any) {
    if (this.translate.currentLang == 'en') {
      return moment(date).format("MM/DD/YYYY");
    }

    return moment(date).format("DD/MM/YYYY");
  }

  formatCpf(cpf: string) {
    return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
  }

  formatTelephone(telephone: string) {
    return telephone
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})(\d)/, "$1-$2")
  }
}