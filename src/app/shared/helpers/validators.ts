import { AbstractControl, ValidationErrors } from '@angular/forms';

export function mailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const ctonrolValue = control.value || '';
  const mailValidatorRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isValid = mailValidatorRegex.test(String(ctonrolValue).toLowerCase());
  if (isValid) {
    return null;
  }
  return { invalid_format: 'ivalid mail format' };
}

export function noWhitespaceValidator(
  control: AbstractControl
): ValidationErrors | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { required: true };
}
