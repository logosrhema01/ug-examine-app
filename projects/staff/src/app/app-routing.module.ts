import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { TimetableComponent } from './views/timetable/timetable.component';
import { CoursesComponent } from './views/courses/courses.component';
import { AddCourseDialogComponent } from './views/add-course-dialog/add-course-dialog.component';
import { LecturersComponent } from './views/lecturers/lecturers.component';
import { AddLecturerComponent } from './views/add-lecturer/add-lecturer.component';
import { AllocationsComponent } from './views/allocations/allocations.component';
import { AddAllocationComponent } from './views/add-allocation/add-allocation.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { TicketsComponent } from './views/tickets/tickets.component';


@Injectable({
  providedIn: 'root'
})
export class LoginActivate implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
    return true;
  }
}

const routes: Routes = [
  {
    path: 'staff/auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      // { path: 'register', component: RegisterComponent },
    ]
  },
  {
    path: "staff",
    component: AdminComponent,
    canActivate:  [LoginActivate],
    children: [
      { path: "timetable", component: TimetableComponent },
      { path: "courses", component: CoursesComponent },
      { path: 'add-course', component: AddCourseDialogComponent },
      { path: 'lecturers', component: LecturersComponent },
      { path: 'add-lecturer', component: AddLecturerComponent },
      { path: 'allocations', component: AllocationsComponent },
      { path: 'add-allocation', component: AddAllocationComponent },
      { path: 'tickets', component: TicketsComponent },
      // { path: "tables", component: TablesComponent },
      // { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "timetable", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
