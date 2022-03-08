import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Animation } from '@ionic/angular';
import { fromEvent, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appAnimation]',
})
export class AnimationDirective implements OnInit, OnDestroy {
  @Input('appAnimation') private animation: Animation;
  private destroy$ = new Subject<void>();

  public constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {
    fromEvent(this.elementRef.nativeElement, 'animate-out')
      .pipe(
        switchMap(({ detail }) => this.animateOut(detail.parentViewRef)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public async ngOnInit(): Promise<void> {
    const element = this.elementRef.nativeElement;
    this.animation.addElement(element);
    await this.animateIn();
  }

  public animateIn(): Promise<void> {
    return this.animation.play();
  }

  public animateOut(parentViewRef: ViewContainerRef): Promise<void> {
    return this.animation
      .direction('reverse')
      .play()
      .then(() => {
        if (parentViewRef) {
          parentViewRef.clear();
          this.cdr.markForCheck();
          return;
        }
        return;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
