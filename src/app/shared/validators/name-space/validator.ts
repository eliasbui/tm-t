import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import { Utils } from '../utils';

const name = /^[^@$!%*?&^(){}+#|`<>'/]{1,128}$/;

export const nameSpace: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {
  if (Utils.isPresent(Validators.required(control))) {
    return null;
  }

  const v: string = control.value.trim();
  return name.test(v) ? null : { 'nameSpace': true };
};