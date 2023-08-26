import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {
  Allocation,
  AllocationsService,
  TicketsService,
  User,
} from '../../api/main/v1';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allocations',
  templateUrl: './allocations.component.html',
  styleUrls: ['./allocations.component.css'],
})
export class AllocationsComponent {
  displayedColumns = [
    'staffId',
    'staffSurname',
    'staffOthername',
    'course',
    'description',
    'year',
    'semmester',
    'noStudents',
    'modeofExam',
    'action',
  ];
  dataSource = new MatTableDataSource();
  error: string | undefined;

  constructor(
    public dialog: MatDialog,
    private allocationsService: AllocationsService,
    private ticketsService: TicketsService,
    private router: Router
  ) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit(): void {
    this.allocationsService.findAll().subscribe((allocations) => {
      this.dataSource.data = allocations;
    });
  }

  submitTicket(allocation: any) {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString) as User;
    if (user.role !== User.RoleEnum.Student) return;
    this.ticketsService
      .create({
        status: TicketStatus.CREATED,
        studentID: user.username,
        allocationID: allocation.id,
      })
      .subscribe(
        () => this.router.navigateByUrl('/student/tickets'),
        () => window.alert("Couldn't create ticket, one already open")
      );
  }
}

export enum TicketStatus {
  CREATED = 'created',
  OPEN = 'open',
  IN_PROGRESS = 'investigating',
  CLOSED = 'closed',
}
