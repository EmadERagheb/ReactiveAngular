import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Router } from "@angular/router";
import { AuthStoreService } from "../services/auth-store.service";


@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authStore: AuthStoreService
  ) {
    this.form = fb.group({
      email: ["test@angular-university.io", [Validators.required]],
      password: ["test", [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    const val = this.form.value;
    this.authStore.login(val.email, val.password).subscribe({
      next:()=>{
        this.router.navigateByUrl("/courses")
      },
      error:(error)=>{
        alert("login failed")
      }
    });
  }
}
