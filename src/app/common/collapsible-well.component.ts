import { Component, Input } from '@angular/core';


@Component({
  selector: 'collapsible-well',
  template: `
  <div class="well" (click)="toggleContent()" >
    <h4>
      <ng-content select=[well-title] ></ng-content>
    </h4>
    <ng-content *ngIf="visible" selectl=[well-body]></ng-content>
  </div>
  `})
export class CollapsibleComponent {
  visible = true;
  toggleContent() {
     this.visible = !this.visible;
  }
}
