import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITraining } from './shared/index';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'training-thumbnail',
  template: `
  <div class="well hoverwell:hover"  [routerLink]="['/training/Details']" [queryParams]="{record:training | json }" routerLinkActive="router-link-active" >
     <!-- {{training[0]|json}} -->
  <h3>{{training?.courseName}}</h3>
  <div>Course Description : {{training?.courseDescription}}</div>
  <div>Created Date : {{training?.dateOfCreated}}</div>
  <div>Last Updated : {{training?.lastUpdated}}</div>
  <button class="btn btn-primary" (click)="handleclick()">Click Me</button>
  </div>
  `
  })
export class TrainingThumbnailComponent {
  @Input() training: any;
  @Output() eventClick = new EventEmitter();
  handleclick() {
      // console.log(this.training);
    this.eventClick.emit(this.training);

  }
}
