// tslint:disable:directive-selector
// tslint:disable:no-use-before-declare
import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { min } from './validator';

const MIN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinValidator),
  multi: true
};

@Directive({
  selector: '[min][formControlName],[min][formControl],[min][ngModel]',
  providers: [MIN_VALIDATOR]
})
export class MinValidator implements Validator, OnInit, OnChanges {
  @Input() public min: number;

  private validator: ValidatorFn;
  private onChange: () => void;

  public ngOnInit() {
    this.validator = min(this.min);
  }

  public ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'min') {
        this.validator = min(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  public validate(c: AbstractControl): { [key: string]: any } {
    return this.validator(c);
  }

  public registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
