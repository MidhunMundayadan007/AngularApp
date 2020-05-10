
export interface ITraining {
  id: number;
  CourseName: string;
  DateOfCreated: Date;
  LastUpdated: string;
  ImageUrl: string;
  CourseDescription: string;
  courseduration?: string;
}
export interface ICourse {
  id: number;
  TrainingId: number;
  Topic: string;
  Description: number;
  CreatedUser: string;
  UpdatedUser: string;
  NumberOfVotes: number;
  Comments: string;
  level: string;
 }
