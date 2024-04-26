import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationAndAuthorizationService } from "@core/services";

@Component({
  selector: "ite-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  constructor(
    public authService: AuthenticationAndAuthorizationService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  logOut(): void {
    this.authService.logOut().subscribe((val: any) => {
      if (val) {
        this.router.navigate(["login"]);
      }
    });
  }

}
