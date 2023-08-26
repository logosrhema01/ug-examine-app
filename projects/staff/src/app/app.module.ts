import {
  EnvironmentProviders,
  ModuleWithProviders,
  NgModule,
  Provider,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatGridListModule } from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from "@angular/material/dialog";

import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TimetableComponent } from './views/timetable/timetable.component';

import { AdminComponent } from './layouts/admin/admin.component';

import { AdminNavbarComponent } from './components/navbars/admin-navbar/admin-navbar.component';
import { AuthNavbarComponent } from './components/navbars/auth-navbar/auth-navbar.component';
import { CardPageVisitsComponent } from './components/cards/card-page-visits/card-page-visits.component';
import { CardProfileComponent } from './components/cards/card-profile/card-profile.component';
import { CardSettingsComponent } from './components/cards/card-settings/card-settings.component';
import { CardSocialTrafficComponent } from './components/cards/card-social-traffic/card-social-traffic.component';
import { CardStatsComponent } from './components/cards/card-stats/card-stats.component';
import { CardTableComponent } from './components/cards/card-table/card-table.component';
import { FooterAdminComponent } from './components/footers/footer-admin/footer-admin.component';
import { FooterComponent } from './components/footers/footer/footer.component';
import { FooterSmallComponent } from './components/footers/footer-small/footer-small.component';
import { HeaderStatsComponent } from './components/headers/header-stats/header-stats.component';
import { IndexNavbarComponent } from './components/navbars/index-navbar/index-navbar.component';
import { IndexDropdownComponent } from './components/dropdowns/index-dropdown/index-dropdown.component';
import { TableDropdownComponent } from './components/dropdowns/table-dropdown/table-dropdown.component';
import { PagesDropdownComponent } from './components/dropdowns/pages-dropdown/pages-dropdown.component';
import { NotificationDropdownComponent } from './components/dropdowns/notification-dropdown/notification-dropdown.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserDropdownComponent } from './components/dropdowns/user-dropdown/user-dropdown.component';
import { CoursesComponent } from './views/courses/courses.component';
import { AddCourseDialogComponent } from './views/add-course-dialog/add-course-dialog.component';
import { ApiModule, Configuration, ConfigurationParameters } from './api/main/v1';
import { LecturersComponent } from './views/lecturers/lecturers.component';
import { AddLecturerComponent } from './views/add-lecturer/add-lecturer.component';
import { AllocationsComponent } from './views/allocations/allocations.component';
import { AddAllocationComponent } from './views/add-allocation/add-allocation.component';
import { StaffHttpInterceptor } from './http.interceptor';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';

const providers: (Provider | EnvironmentProviders)[] | undefined = [
  { provide: HTTP_INTERCEPTORS, useClass: StaffHttpInterceptor, multi: true },
];

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: 'https://0fca-102-223-21-195.ngrok-free.app',
  };
  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent,
    TimetableComponent,
    AdminNavbarComponent,
    AuthNavbarComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    FooterAdminComponent,
    FooterComponent,
    FooterSmallComponent,
    HeaderStatsComponent,
    IndexNavbarComponent,
    IndexDropdownComponent,
    TableDropdownComponent,
    PagesDropdownComponent,
    NotificationDropdownComponent,
    SidebarComponent,
    UserDropdownComponent,
    AdminComponent,
    CoursesComponent,
    AddCourseDialogComponent,
    LecturersComponent,
    AddLecturerComponent,
    AllocationsComponent,
    AddAllocationComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    FullCalendarModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    ApiModule.forRoot(apiConfigFactory),
  ],
  providers: providers,
  bootstrap: [AppComponent],
})
export class AppModule {}

@NgModule({})
export class StaffSharedModule {
  static forRoot(): ModuleWithProviders<AppModule> {
    return {
      ngModule: AppModule,
      providers: providers,
    };
  }
}
