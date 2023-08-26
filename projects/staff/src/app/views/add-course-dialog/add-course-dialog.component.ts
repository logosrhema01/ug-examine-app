import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoursesService } from '../../api/main/v1';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.css']
})
export class AddCourseDialogComponent implements OnInit {
  // Values of Enum Campus
  campuses = ['legon', 'accra', 'distance'];

  courseForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      campus: ['', Validators.required],
    });
  }

  save() {
    try {
      this.coursesService.create({
        code: this.courseForm.value.code,
        // name: this.courseForm.value.name,
        campus: this.courseForm.value.campus
      }).subscribe(() => {
        this.router.navigate(['/staff/courses']);
      });
    } catch (error) {
      console.log(error);
    }
  }



}
