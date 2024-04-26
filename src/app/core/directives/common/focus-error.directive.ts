import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[appFocusError]'
})
export class FocusErrorDirective {
  constructor(private el: ElementRef) { }

  @HostListener('submit')
  public onFormSubmit() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.mat-input-element.ng-invalid');
    if (invalidElements.length > 0) {
      // if (invalidElements[0].nodeName === 'MAT-SELECT') {
      //   invalidElements[0].click();
      // } else {
      //   invalidElements[0].focus();
      // }
      invalidElements[0].focus();
    }
  }
}
