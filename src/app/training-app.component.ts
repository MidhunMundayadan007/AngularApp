import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'training-app',
  template: `
  <nav-bar></nav-bar>
  <router-outlet></router-outlet>
  `})
export class TrainingAppComponent {
  title = 'web-training';
}
