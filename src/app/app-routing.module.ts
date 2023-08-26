import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffSharedModule } from 'projects/staff/src/app/app.module';
import { StudentSharedModule } from 'projects/student/src/app/app.module';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('projects/staff/src/app/app.module').then(
        (m) => m.StaffSharedModule
      ),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('projects/student/src/app/app.module').then(
        (m) => m.StudentSharedModule
      ),
  },
  {
    path: '**',
    // Redirect to Student
    loadChildren: () =>
      import('projects/student/src/app/app.module').then(
        (m) => m.StudentSharedModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StudentSharedModule.forRoot(),
    StaffSharedModule.forRoot(),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
