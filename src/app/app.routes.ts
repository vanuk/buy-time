import { Routes } from '@angular/router';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';


import { AddTimeslotComponent } from './pages/createtimeslot/createtimeslot';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { CreatebookComponent } from './pages/createbook/createbook.component';
import { TeacherDetailsComponent } from './pages/teacher-details/teacher-details.component';
import { TimeslotPageComponent } from './pages/timeslot-page/timeslot-page.component';

export const routes: Routes = [
  { path: '', component: TeacherComponent, pathMatch: 'full' },
  { path: 'user-page', component: UserPageComponent },
  { path: 'new-page', component: NewPageComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'add-timeslot', component: AddTimeslotComponent },
  { path: 'teach-info/:id', component: TeacherDetailsComponent },
  { path :'createbook', component: CreatebookComponent },
  { path : 'timeslot-page', component: TimeslotPageComponent }
];
