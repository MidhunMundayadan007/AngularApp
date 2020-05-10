import { ITraining } from './shared/index';
import { ActivatedRoute } from '@angular/router';
// import { ToastrService } from '../common/toastr.service';
import { Component, OnInit } from '@angular/core';
import { TrainingService } from './shared/training-service';


@Component({
  template: `<div>
    <h1>Web development trainings</h1>
    <hr/>
    <div class="row" *ngFor="let training of trainings">
    <training-thumbnail [training] ="training"></training-thumbnail>
    </div>
    </div>`
})
export class TrainingListComponent implements OnInit {
   trainings: ITraining[];
   // tslint:disable-next-line:no-shadowed-variable
   constructor(private trainingService: TrainingService,
               private route: ActivatedRoute) {
        }
   ngOnInit(): ITraining[] {
    // tslint:disable-next-line:no-string-literal
    return this.trainings = this.route.snapshot.data['trainings'];
   }
}



