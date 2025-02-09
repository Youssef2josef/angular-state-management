import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { user } from '../models/user.model';

import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
    constructor(private authService: AuthService,
                private router: Router,
                private cookieService: CookieService) { }

    ngOnInit(): void {

      if (this.authService.isUserLoggedIn()) {
        console.log(true);
        
        this.router.navigate(['/dashboard']);
      }

        this.loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
        });
    }

    onClickLogin() {
		// Implement your authentication logic here, e.g., send credentials to backend
		if (this.loginForm.valid) {

      const loginData: user = {
        userName: this.loginForm.value.username,
        password: this.loginForm.value.password
    };
		
		this.authService.login(loginData).subscribe(
			()=> {
        
				if (this.authService.isLoggedIn == 1) {
					// Usually you would use the redirect URL from the auth service.
					// However to keep the example simple, we will always redirect to `/admin`.
					const redirectUrl = '/dashboard';
	
					// Set our navigation extras object
					// that passes on our global query params and fragment
					const navigationExtras: NavigationExtras = {
						queryParamsHandling: 'preserve',
						preserveFragment: true
					};
          Swal.fire({
            title: 'Successful login',
            text: 'You will redirected to the dashboard soon',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Okay',
            timer: 2000,
            backdrop: false
          })
					// Redirect the user
          setTimeout(() => {
            this.router.navigate([redirectUrl], navigationExtras);
          }, 2000);

          } else if (this.authService.isLoggedIn == 0) { 
          Swal.fire({
            title: 'wrong login',
            text: 'Verify your credentials',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Okay',
            timer: 2000,
            backdrop: false
          })
          console.log('Login failed');
        }else{
          Swal.fire({
            title: 'Server down',
            text: 'verify your request after',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Okay',
            timer: 2000,
            backdrop: false
          })
        }
			}
		);
    }
	}
}
