import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appNgIfAnimated]',
})
export class NgIfAnimatedDirective {
  private childViewRef: EmbeddedViewRef<unknown> = null;

  public constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {}

  @Input()
  public set appNgIfAnimated(show: boolean) {
    if (show) {
      this.childViewRef = this.viewContainer.createEmbeddedView(
        this.templateRef
      );
      this.cdr.markForCheck();
    } else {
      if (this.childViewRef) {
        const node = this.childViewRef.rootNodes[0];
        if (node) {
          node.dispatchEvent(
            new CustomEvent('animate-out', {
              detail: { parentViewRef: this.viewContainer },
            })
          );
        }
      }
    }
  }
}
