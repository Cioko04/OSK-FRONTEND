import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appResizeText]',
})
export class ResizeTextDirective implements AfterViewInit {
  private minFontSize = 5;
  private maxFontSize = 30;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.resizeText();
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeText();
  }

  private resizeText() {
    const parent = this.el.nativeElement.closest('figure');
    const element = this.el.nativeElement;

    let fontSize = this.minFontSize;
    this.renderer.setStyle(element, 'fontSize', `${fontSize}px`);

    while (
      element.scrollHeight <= parent.clientHeight * 0.35 &&
      fontSize <= this.maxFontSize
    ) {
      fontSize += 1;
      this.renderer.setStyle(element, 'fontSize', `${fontSize}px`);
    }

    while (
      element.scrollHeight > parent.clientHeight * 0.35 &&
      fontSize > this.minFontSize
    ) {
      fontSize -= 1;
      this.renderer.setStyle(element, 'fontSize', `${fontSize}px`);
    }
  }
}
