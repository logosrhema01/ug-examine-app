import { Component } from '@angular/core';
import { TicketsService, User } from '../../api/main/v1';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {
  displayedColumns = ['status', 'courseCode', 'year', 'reporter', 'assignee', 'description'];
  dataSource  = new MatTableDataSource();

  constructor(public dialog: MatDialog, private ticketsService: TicketsService) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit(): void {
    this.ticketsService.findAll().subscribe((tickets) => {
      const local = localStorage.getItem('user')
      if(!local) return;
      const user = JSON.parse(local) as User;
      this.dataSource.data = tickets.filter(t => t.studentID === user.username);
    });
  }
}
