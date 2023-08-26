import { Component } from '@angular/core';
import { Allocation, AllocationsService, Course, CoursesService, Staff, StaffService, } from '../../api/main/v1';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Campus } from '../courses/courses.component';


@Component({
  selector: 'app-add-allocation',
  templateUrl: './add-allocation.component.html',
  styleUrls: ['./add-allocation.component.css']
})
export class AddAllocationComponent {
  allocationForm: FormGroup = new FormGroup({});

  courses$: Course[] = [];
  staff$: Staff[] = [];

  modeOfExams = [
    'WRITTEN', 'ONLINE ONSITE', 'ONLINE'
  ]

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private staffService: StaffService,
    private allocationsService: AllocationsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.coursesService.findAll().subscribe((courses) => {
      this.courses$ = courses;
    });

    this.staffService.findAll().subscribe((staff) => {
      this.staff$ = staff;
    });

    this.allocationForm = this.formBuilder.group({
      course: ['', Validators.required],
      staff: ['', Validators.required],
      description: ['', Validators.required],
      semmester: ['', Validators.required],
      year: ['', Validators.required],
      modeofExam: ['', Validators.required],
      noStudents: ['', Validators.required],
    });
  }

  save() {
    try {
      this.allocationsService.create({
        courseId: this.allocationForm.value.course,
        staffId: this.allocationForm.value.staff,
        year: this.allocationForm.value.year,
        description: this.allocationForm.value.description,
        semmester: this.allocationForm.value.semmester,
        modeOfExams: this.allocationForm.value.modeofExam,
        noStudents: this.allocationForm.value.noStudents,
      }).subscribe(() => {
        this.router.navigate(['/staff/allocations']);
      });

    } catch (error) {
      console.log(error);
    }
  }
}
