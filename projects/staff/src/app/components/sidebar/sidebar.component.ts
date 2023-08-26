import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}
  toggleCollapseShow(classes: any) {
    this.collapseShow = classes;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
