import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import { Utils } from '../utils';

export const fullSpace: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {
  if (Utils.isPresent(Validators.required(control))) {
    return null;
  }

  const v: string = control.value;
  return v.trim() === '' ? { 'fullSpace': true } : null;
};
