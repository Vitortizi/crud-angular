import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS } from '@angular/forms';
import { CpfValidator } from './cpf.validator';

@Directive({
  selector: '[appCpfValidate][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CpfValidatorDirective,
    multi: true
  }]
})

export class CpfValidatorDirective extends CpfValidator implements Validator { }
