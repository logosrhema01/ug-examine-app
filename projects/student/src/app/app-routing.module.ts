import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { TimetableComponent } from './views/timetable/timetable.component';
import { StudentAuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { TicketsComponent } from './views/tickets/tickets.component';
import { AllocationsComponent } from './views/allocations/allocations.component';
import { Observable } from 'rxjs';
import { StudentAuthService } from './auth/auth.service';

@Injectable()
export class LoginActivate implements CanActivate {
  constructor(private authService: StudentAuthService, private router: Router) {}

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
    path: 'student/auth',
    component: StudentAuthComponent,
    children: [
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    ],
  },
  {
    path: "student",
    component: AdminComponent,
    children: [
      { path: "timetable", component: TimetableComponent },
      { path: "allocations", component: AllocationsComponent },
      { path: "tickets", component: TicketsComponent },
      // { path: "tables", component: TablesComponent },
      // { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "timetable", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
