import * as training from './training/index';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './error/404.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  {path: 'training/topics/new', component: training.CreateTopicsComponent},
  {path: 'training/new', component: training.CreateTrainingComponent,
  canDeactivate: ['canDeactivateCreateTraining']},
  {path: 'training', component: training.TrainingListComponent,
   resolve: {trainings: training.TrainingListResolver}},
  {path: 'training/Details', component: training.TrainingDetailsComponent,
  canActivate: [training.TrainingRouteActivator]},
  { path: '404', component: Error404Component },
  {path: '', redirectTo: 'training' , pathMatch: 'full'},
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

