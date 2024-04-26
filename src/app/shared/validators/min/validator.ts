import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import { Utils } from '../utils';

// tslint:disable-next-line:variable-name
export const min = (_min: number): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: boolean } => {
    if (!Utils.isPresent(_min)) {
      return null;
    }
    if (Utils.isPresent(Validators.required(control))) {
      return null;
    }

    const v: number = +control.value;
    return v > +_min ? null : { min: true };
  };
};
