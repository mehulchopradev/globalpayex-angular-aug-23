import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[case]'
})
export class CaseDirective implements OnChanges {

  @Input('case')
  case: string = '';

  constructor(private el: ElementRef) { }

  ngOnChanges(): void {
    const nativeElement: HTMLElement = this.el.nativeElement;
    let textContent = nativeElement.textContent?.trim();
    if (textContent) {
      if (!this.case || this.case === 'capitalize') {
        textContent = this.#capitalize(textContent);
      } else if (this.case === 'upper') {
        textContent = textContent.toUpperCase();
      } else if (this.case === 'lower') {
        textContent = textContent.toLowerCase();
      }

      nativeElement.textContent = textContent;
    }
  }

  #capitalize(value: string): string {
    if (value) {
      if (value.length == 1) {
        return value.toUpperCase();
      }

      return `${value[0].toUpperCase()}${value.substring(1).toLowerCase()}`;
    }

    return value;
  }

}
