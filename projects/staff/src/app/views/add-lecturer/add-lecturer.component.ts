import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffService } from '../../api/main/v1';

@Component({
  selector: 'app-add-lecturer',
  templateUrl: './add-lecturer.component.html',
  styleUrls: ['./add-lecturer.component.css']
})
export class AddLecturerComponent {
  lecturerForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private staffService: StaffService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.lecturerForm = this.formBuilder.group({
      id: ['', Validators.required],
      surname: ['', Validators.required],
      othername: ['', Validators.required],
      department: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  save() {
    try {
      this.staffService.create({
        id: this.lecturerForm.value.id,
        surname: this.lecturerForm.value.surname,
        othername: this.lecturerForm.value.othername,
        department: this.lecturerForm.value.department,
        phone: this.lecturerForm.value.phone,
        email: this.lecturerForm.value.email,
      }).subscribe(() => {
        this.router.navigate(['/staff/lecturers']);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
