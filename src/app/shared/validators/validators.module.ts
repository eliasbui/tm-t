
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { base64, Base64Validator } from './base64';
import { equal, EqualValidator } from './equal';
import { equalTo, EqualToValidator } from './equal-to';
import { maxDate, MaxDateValidator } from './max-date';
import { minDate, MinDateValidator } from './min-date';
import { phone, PhoneValidator } from './phone';
import { min } from './min';
import { telephone } from './telephone';
import { nameSpace } from './name-space';
import { age, AgeValidator } from './age';
import { passwordStrength, PasswordStrengthValidator } from './password-strength';
import { mandatory, MandatoryValidator } from './mandatory';
import { number, NumberValidator } from './number';
import { fullSpace } from './full-space';

// tslint:disable-next-line:variable-name
export const FormValidators: any = {
  base64,
  equal,
  equalTo,
  maxDate,
  minDate,
  phone,
  number,
  telephone,
  age,
  min,
  nameSpace,
  passwordStrength,
  mandatory,
  fullSpace
};

const FORM_VALIDATOR_DIRECTIVES = [
  Base64Validator,
  EqualValidator,
  EqualToValidator,
  MaxDateValidator,
  MinDateValidator,
  PhoneValidator,
  NumberValidator,
  AgeValidator,
  PasswordStrengthValidator,
  MandatoryValidator
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FORM_VALIDATOR_DIRECTIVES
  ],
  exports: [
    FORM_VALIDATOR_DIRECTIVES
  ],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormValidatorModule {
}
