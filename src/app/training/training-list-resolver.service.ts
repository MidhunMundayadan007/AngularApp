import { ITraining } from './shared/index';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TrainingService } from './shared/training-service';
import { map } from 'rxjs/operators';


@Injectable()
export class TrainingListResolver implements Resolve<ITraining> {
  constructor(private trainingService: TrainingService) {
  }

  resolve() {
    return this.trainingService.getTrainings().pipe(
      map((trainings => {
        return trainings;
      }))
    );
  }
}
