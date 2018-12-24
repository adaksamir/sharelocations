import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserDataService } from '../data/user-data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
    successMessage = '';
    employeeForm: FormGroup;

    constructor(private formBuilder: FormBuilder, 
                private userDataService: UserDataService, 
                private router: Router) { }

    // name = this.employeeForm.get('name')
    // email = this.employeeForm.get('email')
    // pass = this.employeeForm.get('password')
    // conf = this.employeeForm.get('confpass')

    ngOnInit() {
        this.employeeForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(5)]],
            confpass: ['', [Validators.required, this.passwordValidator]]
        });

        this.employeeForm.controls.password.valueChanges
            .subscribe(
                x=>this.employeeForm.controls.confpass.updateValueAndValidity()
            );
    }

    // USER REGISTRATION FUNCTIONALITIES 
    submitUser(): void {
        this.userDataService.saveUser(this.employeeForm.value).subscribe(
            user => {
                console.log("user save ok: ", user);
                this.successMessage = 'Registration successful! Please login'
                this.router.navigate(['/login']);
            },
            error => {
                console.error("user save error: ", error)
                this.successMessage = 'Registration error'
            }
        )
    }

    // CUSTOM PASSWORD VALIDATORS
    passwordValidator(control: AbstractControl) {
        if (control && (control.value !== null || control.value !== undefined)) {
            const confpassValue = control.value;
            const passwordControl = control.root.get('password');
            if (passwordControl) {
                const passwordValue = passwordControl.value;
                if (passwordValue !== confpassValue || passwordValue === '') {
                    return { isError: true };
                }
            }

        }
        return null;
    }

}