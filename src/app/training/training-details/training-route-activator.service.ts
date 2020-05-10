import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TrainingService } from '../shared/training-service';

@Injectable()
export class TrainingRouteActivator implements CanActivate {

  constructor(private trainingService: TrainingService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot) {
    const trainingExist = !!this.trainingService.getTraining(+route.params.id);
    if (!trainingExist) {
      this.router.navigate(['/404']);
    }
    return true;
  }
}
