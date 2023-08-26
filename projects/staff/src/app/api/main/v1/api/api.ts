export * from './allocations.service';
import { AllocationsService } from './allocations.service';
export * from './auth.service';
import { AuthService } from './auth.service';
export * from './courses.service';
import { CoursesService } from './courses.service';
export * from './default.service';
import { DefaultService } from './default.service';
export * from './staff.service';
import { StaffService } from './staff.service';
export * from './tickets.service';
import { TicketsService } from './tickets.service';
export * from './timetable.service';
import { TimetableService } from './timetable.service';
export const APIS = [AllocationsService, AuthService, CoursesService, DefaultService, StaffService, TicketsService, TimetableService];