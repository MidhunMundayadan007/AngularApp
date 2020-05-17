import { ICourse } from './../shared/training.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrainingService } from '../shared/training-service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-topic',
  templateUrl: './create-topics.component.html',

})
export class CreateTopicsComponent implements OnInit {
  courseForm: FormGroup;
  Topic: FormControl;
  level: FormControl;
  Description: FormControl;
  @Output() saveTopics = new EventEmitter();
  @Output() cancelTopics = new EventEmitter();
  training: any;
  constructor(private trainingService: TrainingService , private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.Topic = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.Description = new FormControl('', Validators.required);
    this.courseForm = new FormGroup({
      Topic: this.Topic,
      level: this.level,
      Description: this.Description
    });


  }

  onSubmit(formData) {
    // console.log(this.training.id);
    // console.log(this.training.id);
    // console.log(this.training.id);

    this.training = JSON.parse(this.route.queryParams?.value?.record) as any;
    this.trainingService.saveTopics(formData, this.training.id) .pipe(first())
    .subscribe(
        () => {
          this.saveTopics.emit(formData);
        },
        error => {
          console.log(error);
        });
  }
  cancel() {
    this.cancelTopics.emit();
  }
}
