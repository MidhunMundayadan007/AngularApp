import { ICourse, TrainingService } from '../shared/index';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'topic-list',
  templateUrl: './topic-list.component.html'
})
export class TopicListComponent implements OnChanges {
  @Input() topics: ICourse[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  visibilTopics: ICourse[] = [];
  training: any;
  constructor(private trainingService: TrainingService , private actroute: ActivatedRoute,
              private route: Router) {

  }
  // // tslint:disable-next-line:use-lifecycle-interface
  // ngOnInit()
  // {
  //     this.training = JSON.parse(this.actroute.queryParams?.value?.record) as any;
  //     this.visibilTopics = this.trainingService.getTopics(this.training.id)
  //     .pipe(first())
  //     .subscribe(
  //         (res) => {
  //     this.filterTopic(this.filterBy);
  //     this.sortBy === 'name' ? this.visibilTopics.sort(sortByName)
  //     : this.visibilTopics.sort(sortByVotesDesc);
  //         },
  //         error => {
  //           // this.toster.error(error?.error?.message);
  //         });
  // }
  ngOnChanges() {

      this.training = JSON.parse(this.actroute.queryParams?.value?.record) as any;
      this.trainingService.getTopics(this.training.id)
      .pipe(first())
      .subscribe(
          (res) => {
            this.visibilTopics = res;
            this.filterTopic(this.filterBy);
            this.sortBy === 'name' ? this.visibilTopics.sort(sortByName)
      : this.visibilTopics.sort(sortByVotesDesc);
          },
          error => {
            // this.toster.error(error?.error?.message);
          });
  }
  filterTopic(filterBy: string) {
    if (filterBy  === 'all') {
       this.visibilTopics = this.visibilTopics;
    } else {
       this.visibilTopics = this.topics.filter(topics => {
          return topics.level.toLocaleLowerCase() === filterBy;
        });
    }
  }
}
function sortByVotesDesc(a: ICourse, b: ICourse)  {

  return a.NumberOfVotes - b.NumberOfVotes;
}

function sortByName(a: ICourse, b: ICourse)  {
  if (a.Topic > b.Topic) {
    return 1;
  } else if (a.Topic === b.Topic) {
    return 0;
  } else {
    return -1;
  }
}
