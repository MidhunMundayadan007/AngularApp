import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { ITraining, ICourse } from './training.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class  TrainingService {


  baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) {
}
saveTopics(formData: any, trainingId: number) {
  const addTopic  =
  {
    TrainingId: trainingId,
    Topic: formData.Topic ,
    Description: formData.Description,
    Level: formData.level,
  };
  return  this.http.post<any>(this.baseUrl + 'api/Topic/save',
  JSON.stringify(addTopic))
  .pipe(map(res => {
      // this.currentUserSubject.next(res);
      return res;
}));
}
  searchTraining(searchTerm: string) {
    const term = searchTerm.toLocaleLowerCase();
    let result: ICourse[] = [];
    // TRAININGS.forEach(training => {
    //   let matchingTrainings = training.topics.filter(course =>   // tslint:disable-next-line:no-unused-expression
    //     course.name.toLocaleLowerCase().indexOf(term) > -1);
    //     // tslint:disable-next-line:no-shadowed-variable
    //   matchingTrainings = matchingTrainings.map(course => {
    //         course.id = training.id;
    //         return course;
    //       });
    //   result = result.concat(matchingTrainings);
    //   });

    const emitter = new EventEmitter(true);
    setTimeout(() => {
        emitter.emit(result);
      }, 100);
    return emitter;
  }

   updateTopics(training: ITraining) {
    // tslint:disable-next-line:no-shadowed-variable
    // const indexTraining = TRAININGS.findIndex(index => index.id = training.id);
    // TRAININGS[indexTraining] = training;
  }
  saveTraining(formData: any) {
    const registerUser  = { CourseName: formData.CourseName,
       CourseDescription: formData.CourseDescription ,
      ImageUrl: formData.ImageUrl};
    return  this.http.post<any>(this.baseUrl + 'api/Training/save',
    JSON.stringify(registerUser))
    .pipe(map(res => {
        // this.currentUserSubject.next(res);
        return res;
  }));
  }
  getTraining(id: number) {
    return  this.http.get<any>(this.baseUrl + 'api/Training/'+ id)
    .pipe(map(res => {
        // this.currentUserSubject.next(res);
        return res;
  }));
  }
  getTrainings(): any {
    return  this.http.get<any>(this.baseUrl + 'api/Training')
    .pipe(map(res => {
        // this.currentUserSubject.next(res);
        return res;
  }));
  }
  getTopics(id: any): any {
    return  this.http.get<any>(this.baseUrl + 'api/Topic/'+ id)
    .pipe(map(res => {
        // this.currentUserSubject.next(res);
        return res;
  }));
  }
}
