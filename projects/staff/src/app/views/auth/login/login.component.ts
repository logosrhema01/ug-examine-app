import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  staffLoginForm!: FormGroup;
  error$: string|undefined;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.staffLoginForm = this.fb.group({
      staffId: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {}

  login() {
    const { staffId, password } = this.staffLoginForm.value;
    if(staffId && password){
      this.authService.login(staffId,password)
        .subscribe(() => null,
        (err) => {
          this.error$ = 'Unable to login'
        })
    }
  }
}
