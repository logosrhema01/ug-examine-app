import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StudentAuthService } from "../../../auth/auth.service";

@Component({
  selector: "app-student-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  studentLoginForm!: FormGroup;
  error$: string|undefined;
  constructor(
    private fb: FormBuilder,
    private authService: StudentAuthService,
  ) {
    this.studentLoginForm = this.fb.group({
      studentId: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {}

  login() {
    const { studentId, password } = this.studentLoginForm.value;
    if(studentId && password){
      this.authService.login(studentId,password)
        .subscribe(() => null,
        (err) => {
          this.error$ = 'Unable to login'
        })
    }
  }
}
