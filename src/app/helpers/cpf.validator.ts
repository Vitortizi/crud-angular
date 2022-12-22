
import { Validator, AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

export class CpfValidator implements Validator {

  static cpfLength = 11;

  /**
  * Valida um CPF ou CNPJ de acordo com seu dígito verificador.
  */
  static validate(c: AbstractControl): ValidationErrors | null {
    var Soma = 0;
    const cpf = c.value.replace(/\D/g, '');

    // Verifica o tamanho da string.
    if ([CpfValidator.cpfLength].indexOf(cpf.length) < 0) {
      return { length: true };
    }

    // Verifica se todos os dígitos são iguais.
    if (/^([0-9])\1*$/.test(cpf)) {
      return { equalDigits: true };
    }

    /**
    * Calcula o dígito verificador do CPF.
    */
    for (let i = 1; i <= 9; i++) {
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    var Resto = (Soma * 10) % 11;
    if ((Resto === 10) || (Resto === 11)) {
      Resto = 0;
    }

    if (Resto !== parseInt(cpf.substring(9, 10))) {
      return { digit: true };
    }

    Soma = 0;
    for (let k = 1; k <= 10; k++) {
      Soma = Soma + parseInt(cpf.substring(k - 1, k)) * (12 - k)
    }

    Resto = (Soma * 10) % 11;
    if ((Resto === 10) || (Resto === 11)) {
      Resto = 0;
    }

    if (Resto !== parseInt(cpf.substring(10, 11))) {
      return { digit: true };
    }

    return null;
  }

  /**
  * Implementa a interface de um validator.
  */
  validate(c: AbstractControl): ValidationErrors | null {
    return CpfValidator.validate(c);
  }
}