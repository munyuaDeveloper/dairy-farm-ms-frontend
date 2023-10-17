import { SharedService } from './../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private router: Router,
     private sharedService: SharedService,
     private authService: AuthService,
     private fb: FormBuilder){}

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      })
  }

  login() {
    this.sharedService.postRequest('/api/v1/auth/login', this.loginForm.value)
    .pipe(
      take(1),
      tap((res: any) => {
        this.authService.decodeJwt(res?.token);
        this.router.navigate(['/dashboard'])
      })
    ).subscribe()
  }
}
