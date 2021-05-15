import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

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

export function WhitespaceValidator(
  control: AbstractControl
): ValidationErrors | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { required: true };
}

export function SingleLanguageValidator(
  control: AbstractControl
): ValidationErrors | null {
  const elementValue = (control.value || '').trim();
  const onlyLatin = /^[a-zA-Z]+$/.test(elementValue);
  const replacedGeoString = elementValue.replace(
    /[^აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ-]+/g,
    ''
  );
  // if validated
  if (onlyLatin || !elementValue.length || replacedGeoString === elementValue) {
    return null;
  }
  return {
    accapted_only_single_language:
      'შეავსეთ მხოლოდ ქართული ან მხოლოდ ლათინური ასოებით',
  };
}

export function PhoneNumberValidator(
  control: AbstractControl
): ValidationErrors | null {
  const elementValue: string = (control.value || '').trim();
  if (elementValue.length !== 9 || !elementValue.startsWith('5')) {
    return {
      custom_invalid_length: 'არავალიდური ფორმატი. შაბლონი: 5xx xx xx xx',
    };
  }
  return null;
}

export class ComposedValidators {
  readonly textFieldSharedValidators = Validators.compose([
    Validators.min(2),
    Validators.max(50),
    WhitespaceValidator,
    SingleLanguageValidator
  ]);
}
