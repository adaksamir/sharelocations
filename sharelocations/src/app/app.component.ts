import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from './data/user-data.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    isLogin : boolean;
    constructor(private userDataService: UserDataService,
                private router: Router) {}
    
    ngOnInit() {
        this.userDataService.loginTokenObservable.subscribe(boolToken => this.isLogin = boolToken)
    }

    userLogout() {
        const loggedOutToken = this.userDataService.logoutUser();
        console.log('Just Logged out: ', loggedOutToken);
        this.isLogin = !!localStorage.getItem('token');
        this.router.navigate(['/login']);
    }
}
