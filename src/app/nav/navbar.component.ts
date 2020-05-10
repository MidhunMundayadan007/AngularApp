import { ICourse } from './../training/shared/training.model';
import { AuthService } from './../user/auth.service';
import { Component } from '@angular/core';
import { TrainingService } from '../training';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [ `.nav.navbar-nav{font-size:15px;}
  #searchForm{margin-right: 100px;}
  @media (max-width:1200px){#searchForm {display:none;}}
  li > a.active {color:	#F97924;}
  `]
})
export class NavBarComponent {
  searchTerm = '';
  foundCourses: ICourse[];
  constructor(public auth: AuthService, private traingService: TrainingService) {

  }

  searchCourse(searchTerm) {
    this.traingService.searchTraining(searchTerm).subscribe(trainings => {
        this.foundCourses = trainings;
        // console.log(this.foundCourses);
      });
  }
}
