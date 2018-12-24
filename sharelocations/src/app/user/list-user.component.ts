import { Component, OnInit } from '@angular/core';
import { UserDataService } from './../data/user-data.service';
import { User } from '../data/user.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  _users : User[];
  isLogin: boolean;
  constructor(private userDataService: UserDataService, private router : Router) { }

  ngOnInit() {
    // server chekcs wheter logged in or not ...
    // this.userDataService.loginTokenObservable.subscribe(boolToken => {
    //   this.isLogin = boolToken;
    //   this.router.navigate(['/login']);
    // })

    this.userDataService.fetchUsers().subscribe(users=>this._users=users);

  }

  

}
