import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public show = false;
  public fadeInTopAnimation: Animation;

  constructor(private animationController: AnimationController) {}

  public ngOnInit(): void {
    this.initFadeInTopAnimation();
  }

  public toggleShow() {
    this.show = !this.show;
  }

  public initFadeInTopAnimation(): void {
    this.fadeInTopAnimation = this.animationController
      .create('fadeInTop')
      .beforeStyles({ position: 'absolute', top: 0, 'z-index': '1000' })
      .duration(1000)
      .easing('ease-out')
      .fromTo('opacity', 0, 1)
      .fromTo('transform', 'translateY(-50%)', 'translateY(0)');
  }
}
