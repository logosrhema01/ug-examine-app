import { Component } from '@angular/core';
import { Ticket, TicketsService, User } from '../../api/main/v1';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {
  displayedColumns = ['status', 'courseCode', 'year', 'reporter', 'assignee', 'actions','description'];
  dataSource  = new MatTableDataSource();

  constructor(public dialog: MatDialog, private ticketsService: TicketsService, private router: Router) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit(): void {
    this.ticketsService.findAll().subscribe((tickets) => {
      this.dataSource.data = tickets;
    });
  }

  updateTicket(ticket: Ticket, status: string) {
    switch(status) {
      case 'open':
        this.router.navigateByUrl('/staff/tickets')
        this.ticketsService.update(ticket.id, {status: 'open'});
        break;
      case 'investigating':
        this.router.navigateByUrl('/staff/tickets')
        this.ticketsService.update(ticket.id, {status: 'investigating'})
        break;
      case 'closed':
        this.router.navigateByUrl('/staff/tickets')
        this.ticketsService.update(ticket.id, {status: 'closed'});
        break;
      default:
        break
    }
  }
}
