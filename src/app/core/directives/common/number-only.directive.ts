import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
  private specialKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'];

  constructor(private control: NgControl) { }

  @HostListener('input', ['$event']) onInput(event) {
    const val = event.target.value;
    if (val) {
      this.control.control.setValue(val.replace(/[^0-9]*/g, ''));
    }
  }

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    const e = <KeyboardEvent>event;
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    if (
      // Allow: 8-Backspace, 9-Tab, 13-Enter, 27-Esc
      [8, 9, 13, 27].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && e.ctrlKey === true)
    ) {
      return;
    }
    if (
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) === -1
    ) {
      e.preventDefault();
    }
  }
}
