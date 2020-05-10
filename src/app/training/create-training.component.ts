import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingService } from './shared/training-service';
import { first } from 'rxjs/operators';
@Component({
  templateUrl: './create-training.component.html',
  styles: [`em{float: right;color: #E05C65; padding-left:10px}
  .error input {background-color: #E3C3C5}`]
})
export class CreateTrainingComponent {
  isDirty = true;
  newTraining;
  constructor(private route: Router, private trainingService: TrainingService) {
  }
  getAllEvents() {
    this.route.navigate(['/training']);
  }
  saveTraining(formData) {
    this.trainingService.saveTraining(formData)
    .pipe(first())
    .subscribe(
        () => {
          this.route.navigate(['/training']);
        },
        error => {
          console.log(error);
        });;
    this.isDirty = false;
  }
  cancel() {  }
}
