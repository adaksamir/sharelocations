import { Component, OnInit } from '@angular/core';
import { UserDataService } from './../data/user-data.service';
import { User } from '../data/user.type';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  _users : User[];
  constructor(private userDataService: UserDataService) { }

  ngOnInit() {
    this.userDataService.fetchUsers().subscribe(users=>{
      this._users=users;

    });
  }

  

}
