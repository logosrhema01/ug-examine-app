import { Component, OnInit } from "@angular/core";
import { User } from "../../../api/main/v1";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StudentAuthService } from "../../../auth/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  studentRegisterForm!: FormGroup;
  error$: string|undefined;
  constructor(
    private fb: FormBuilder,
    private authService: StudentAuthService,
  ) {
    this.studentRegisterForm = this.fb.group({
      studentId: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      fullName: ['', Validators.required],
    })
  }

  ngOnInit(): void {}

  register() {
    const { studentId, password, email, phoneNumber, fullName } = this.studentRegisterForm.value;
    if(studentId && password && email && phoneNumber && fullName){
      try {
        this.authService.register({
          username: studentId, password, email, phoneNumber, fullName, role: User.RoleEnum.Student
        })
      } catch (error) {
        this.error$ = 'Unable to register'
      }
    }
  }
}
