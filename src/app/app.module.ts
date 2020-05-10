import { JwtInterceptor } from './common/jwt.interceptor';
import { JQ_TOKEN } from './common/jQuery.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TOSTER_TOKEN , Toastr} from './common/toastr.service';
import { NavBarComponent } from './nav/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TrainingAppComponent } from './training-app.component';
import * as training from './training/index';
import { AppRoutingModule } from './route';
import { Error404Component } from './error/404.component';
import { AuthService } from './user/auth.service';
import { CollapsibleComponent } from './common/collapsible-well.component';
import { ModalTriggerDirective } from './common/modal-trigger.directive';
import { SimpleModelComponent } from './common/modelDialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './common/token.interceptor';
let toastr: Toastr = window['toastr'];
let jQuery = window['$'];

@NgModule({
  declarations: [
    CollapsibleComponent,
    TrainingAppComponent,
    training.TrainingListComponent,
    training.TrainingThumbnailComponent,
    NavBarComponent,
    training.TrainingDetailsComponent,
    training.CreateTrainingComponent,
    training.TopicListComponent,
    training.CreateTopicsComponent,
    Error404Component,
    ModalTriggerDirective,
    SimpleModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    training.TrainingService,
    {provide: TOSTER_TOKEN, useValue: toastr},
    {provide: JQ_TOKEN, useValue: jQuery},
    training.TrainingRouteActivator,
    training.TrainingListResolver,
    { provide: 'canDeactivateCreateTraining',   useValue: checkDirtyState, }, AuthService,
    { provide: HTTP_INTERCEPTORS,  useClass: TokenInterceptor,  multi: true },
    { provide: HTTP_INTERCEPTORS,  useClass: JwtInterceptor,  multi: true }],
    bootstrap: [TrainingAppComponent]
})
export class AppModule { }
export function checkDirtyState(component: training.CreateTrainingComponent) {
  if (component.isDirty) {
    return window.confirm('you really want to navigate before saving the date');
  }
  return true;
}
