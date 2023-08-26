import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AllocationsService } from '../../api/main/v1';

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
  ];
  dataSource = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
    private allocationsService: AllocationsService
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
}
