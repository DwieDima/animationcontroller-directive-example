import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AnimationDirective } from '../animation.directive';
import { NgIfAnimatedDirective } from '../ng-if-animated.directive';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [HomePage, AnimationDirective, NgIfAnimatedDirective],
})
export class HomePageModule {}
