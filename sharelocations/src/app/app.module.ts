import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './user/create-user.component';
import { ListUserComponent } from './user/list-user.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginUserComponent } from './user/login-user.component';
import { ShareLocationsComponent } from './user/share-locations.component';

import { AgmCoreModule } from '@agm/core'

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    ListUserComponent,
    LoginUserComponent,
    ShareLocationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBQR-u_OuPA41rDCIdOLMe7x62TpFCBJhU',
      libraries: ["places"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
