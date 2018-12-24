import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserDataService } from '../data/user-data.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-login-user',
    templateUrl: './login-user.component.html',
    styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
    @Output() isLoggedIn = new EventEmitter();
    employeeForm: FormGroup
    constructor(private formBuilder: FormBuilder,
				private userDataService: UserDataService, 
				private router: Router) { }
    
    // email = this.employeeForm.get('email')
    // pass = this.employeeForm.get('password')

    ngOnInit() {
        this.employeeForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(5)]]
        });
	}	

	userLogin(): void {
        this.userDataService.loginUser(this.employeeForm.value).subscribe(
            user => {
				console.log('User Login OK: ', user);
                localStorage.setItem('token', user.token.toString());
                // for logged in or not checking in app commponents ...
                this.isLoggedIn.emit(user.token.toString());
                this.router.navigate(['/userlists']);
			},
            error => console.error("user login error: ", error)
        )
	}
	
}
