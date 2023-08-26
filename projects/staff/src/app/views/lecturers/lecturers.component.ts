import { Component, ElementRef, ViewChild } from '@angular/core';
import { StaffService } from '../../api/main/v1';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.component.html',
  styleUrls: ['./lecturers.component.css']
})
export class LecturersComponent {
  displayedColumns = ['id', 'surname', 'othername', 'email', 'phone', 'department'];
  dataSource  = new MatTableDataSource();

  constructor(public dialog: MatDialog, private staffService: StaffService) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit(): void {
    this.staffService.findAll().subscribe((staff) => {
      this.dataSource.data = staff;
    });
  }
}
