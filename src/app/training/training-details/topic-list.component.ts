import { ICourse } from '../shared/index';
import { Component, Input, OnChanges } from '@angular/core';


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
  ngOnChanges() {
    if (this.topics) {
      this.filterTopic(this.filterBy);
      this.sortBy === 'name' ? this.visibilTopics.sort(sortByName)
      : this.visibilTopics.sort(sortByVotesDesc);
    }
  }


  filterTopic(filterBy: string) {
    if (filterBy  === 'all') {
       this.visibilTopics = this.topics.slice(0);
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
