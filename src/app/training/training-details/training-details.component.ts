import { ICourse } from './../shared/training.model';
import { ITraining } from './../shared/index';
import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../shared/training-service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  templateUrl: './training-details.component.html',
  styles: [`.training-image{height:100px} div{color:white}
  a {cursor: pointer}`]
})
export class TrainingDetailsComponent implements OnInit {
  training: any;
  topics: ICourse;
  addMode: boolean;
  filterBy = 'all';
  sortBy = 'votes';
  constructor(private trainingService: TrainingService, private route: ActivatedRoute) { }
  ngOnInit() {
   this.route.queryParams.subscribe(params => {
      this.training = JSON.parse(params.record) as any;  });
  }
  addTopics() {
    this.addMode = true;
  }
  saveNewTopic(topics: ICourse) {
    // const nextId = Math.max.apply(null, this.training.topics.map(s => s.id));
    // topics.id = nextId + 1;
    // this.training.topics.push(topics);
    this.trainingService.updateTopics(this.training);
    this.addMode = false;
  }
  cancelNewTopic() {
    this.addMode = false;
  }
}
