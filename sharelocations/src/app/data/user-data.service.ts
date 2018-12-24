import { Injectable } from '@angular/core';
import { User } from './user.type';
import { Marker } from './marker.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    _users: User[] = [];
    _apiFetch = 'http://localhost:3001/api/user/lists';
    _apiLogin = 'http://localhost:3001/api/auth/login';
    _apiRegis = 'http://localhost:3001/api/auth/register';
    _apiSelf = 'http://localhost:3001/api/auth/me';
    _apiShareLoc = 'http://localhost:3001/api/maps/share';
    _apiSelfLoc = 'http://localhost:3001/api/maps/lists';
    _apiPublicLoc = 'http://localhost:3001/api/maps/lists/';
    constructor(private _http: HttpClient) { }

    fetchUsers(): Observable<User[]> {
        return this._http.get<User[]>(this._apiFetch, {
            observe: 'body',
            //headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
        });
    }

    loginUser(body: any): Observable<any> {
        return this._http.post<any>(this._apiLogin, body, { observe: 'body' });
    }

    logoutUser(): string {
        const token = localStorage.getItem('token')
        localStorage.removeItem('token');
        return token;
    }

    saveUser(body: any): Observable<any> {
        return this._http.post<any>(this._apiRegis, body, { observe: 'body' });
    }

    shareLoc(body: any): Observable<Marker[]> {
        return this._http.post<Marker[]>(this._apiShareLoc, body, {
            observe: 'body',
            headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
        });
    }

    getSelfLoc(): Observable<Marker[]> {
        return this._http.get<Marker[]>(this._apiSelfLoc, {
            observe: 'body',
            headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
        });
    }

    getPubLoc(id: any): Observable<Marker[]> {
        console.log('public locations: ', this._apiPublicLoc+id);
        return this._http.get<Marker[]>(this._apiPublicLoc+id);
    }

    showSelfUser() {
        return this._http.get<User>(this._apiSelf, {
            observe: 'body',
            headers: new HttpHeaders().append('x-access-token', localStorage.getItem('token'))
        });
    }

}
