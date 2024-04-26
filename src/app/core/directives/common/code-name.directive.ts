import { Directive, HostListener, Input, ElementRef } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: "[codeNameOnly]",
})
export class CodeNameDirective {
  @Input() isEng = false;
  @Input() isUsername = false;
  private specialKeys = [
    "Backspace",
    "Tab",
    "End",
    "Home",
    "ArrowLeft",
    "ArrowRight",
    "Delete",
    "Space",
    "Hyper",
  ];

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener("input", ["$event"])
  onInput(event) {
    const val = event.target.value;
    const r = val
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
      .replace(/ /g, "");
    if (val) {
      this.control.control.setValue(r);
    }
  }

  @HostListener("keypress", ["$event"]) onKeyPress(event) {
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
    let specials = [
      ",",
      "<",
      ">",
      "/",
      "?",
      ";",
      ":",
      "'",
      '"',
      "[",
      "{",
      "]",
      "}",
      "\\",
      "|",
      "`",
      "~",
      "!",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "=",
      "+",
      ".",
      "-",
      "_",
      "@",
    ];
    if (
      specials.indexOf(e.key) !== -1 ||
      e.keyCode === 32 ||
      e.keyCode < 48 ||
      e.keyCode > 122
    ) {
      e.preventDefault();
    }
  }
}
