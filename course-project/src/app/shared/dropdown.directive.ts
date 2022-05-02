import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective{

  // @HostListener('click') dropDownHandler() {
  //   const el = this.elementRef.nativeElement
  //
  //   if (el.classList.contains('open')) {
  //     el.classList.remove('open')
  //   } else {
  //     el.classList.add('open')
  //   }
  // }

  @HostBinding('class.open') isOpen = false

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen
  }

}
