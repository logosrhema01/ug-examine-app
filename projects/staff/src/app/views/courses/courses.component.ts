import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Course, CoursesService } from '../../api/main/v1';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  displayedColumns = ['code', 'campus', 'id'];
  dataSource  = new MatTableDataSource();

  @ViewChild('dialogLocation', { static: false }) public dialogLocation!: ElementRef

  constructor(public dialog: MatDialog, private coursesService: CoursesService) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit(): void {
    this.coursesService.findAll().subscribe((courses) => {
      this.dataSource.data = courses;
    });
  }
}

// export interface Course {
//   name: string;
//   code: string;
//   campus: Campus;
//   id: string;
// }

export enum Campus {
  LEGON = 'legon',
  ACCRA = 'accra',
  DISTANCE = 'distance',
}


