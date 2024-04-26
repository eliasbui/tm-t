import { FirstFocusDirective } from './common/first-focus.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionDirective, AccordionLinkDirective, AccordionAnchorDirective } from '.';
import { MenuItems } from '../models';
import { ImagePreloadDirective } from './image/image-preload.directive';
import { NumberOnlyDirective } from './common/number-only.directive';
import { NoSpecialCharacterDirective } from './common/no-special-character.directive';
import { TextUpperCaseDirective } from './common/text-uppercase.directive';
import { CodeNameDirective } from './common/code-name.directive';
import { FocusErrorDirective } from './common/focus-error.directive';

const DIRECTIVES = [
  AccordionDirective,
  AccordionAnchorDirective,
  AccordionLinkDirective,
  ImagePreloadDirective,
  NumberOnlyDirective,
  NoSpecialCharacterDirective,
  TextUpperCaseDirective,
  FirstFocusDirective,
  CodeNameDirective,
  FocusErrorDirective
];

@NgModule({
  declarations: [
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ...DIRECTIVES,
    CommonModule
  ],
  providers: [MenuItems]
})
export class DirectivesModule { }
