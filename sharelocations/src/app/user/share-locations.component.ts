import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { UserDataService } from '../data/user-data.service';
import { User } from '../data/user.type';
import { Marker } from '../data/marker.type';

declare const google: any;

@Component({
    selector: 'app-share-locations',
    templateUrl: './share-locations.component.html',
    styleUrls: ['./share-locations.component.css']
})
export class ShareLocationsComponent implements OnInit {
    users: User[] = [];
    markers: Marker[] = [];
    marker: Marker;
    
    zoom: number = 14;
    lat: number = 22.5726;
    lng: number = 88.3639;

    name: string = '';
    id: string = '';
    count: number;
    isUsersFlag = false;
    shareSuccessMessage = '';

    isToken: boolean;

    constructor(private userDataService: UserDataService, private route: ActivatedRoute, private mapsAPILoader: MapsAPILoader) {
        this.route.params.subscribe( params => {
            if(!!params && !!params['userid']) {
                this.showPublicLocations(params['userid'])
            } else {
                console.log('from constructor userid: , ', params['userid']);
            }            
        });
    }

    ngOnInit() {
        //token checking for logged in user in localstorage ...
        this.isToken = !!localStorage.getItem('token');
        if(this.isToken) {
            //have self user data (who logged in)
            this.userDataService.showSelfUser().subscribe(user => {
                console.log('self user: ', user);
                if(user) {
                    this.name = user.name;
                    this.id = user._id.toString();
                }                
            });            
            //having all the own share location lists ...
            this.userDataService.getSelfLoc().subscribe(locations => {
                console.log('own locations, ', locations);
                if(locations) {
                    this.markers = locations;
                    this.count = this.markers.length;
                } else {
                    console.log('No own locations found.');
                }
            }); 
        }
        //having all the users list ...
        this.userDataService.fetchUsers().subscribe(users=>{
            console.log('all users: ', users);
            if(users) {
                this.users=users;
            }            
        });
    }

    showPublicLocations(userid) {
        console.log('Calling public locations: ', userid);
        if(!!userid) {            
            this.userDataService.getPubLoc(userid).subscribe(locations => {
                console.log('public locations, ', locations);
                if(!!locations) {
                    this.markers = locations;
                    this.count = this.markers.length;
                } else {
                    console.log('No public locations found.');
                }
            });
        }
    }

    clickedMarker(name: string) {
        //console.log(`clicked the marker: ${name}`)
    }

    mapClicked($event: MouseEvent) {
        this.shareSuccessMessage = "";
        let address = 'Address: free API error';

        if(0) {
            this.mapsAPILoader.load().then(() => {
                let geocoder = new google.maps.Geocoder;
                let latlng = { lat: $event.coords.lat, lng: $event.coords.lng };
                geocoder.geocode({ 'location': latlng }, (results) => {
                    if (results[0]) {                    
                        address = results[0].formatted_address;
                        console.log('reverse geocode : ', address);
                    } 
                    this.markers[this.count] = {
                        lat: $event.coords.lat,
                        lng: $event.coords.lng,
                        name: this.name,
                        address: address,
                        draggable: true
                    };
                });
            });
        }

        this.marker = {
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            who: this.id,
            name: this.name,
            whom: '',
            address: address,
            draggable: true
        }

        //pushing just created marker to markers ...
        //this.markers[this.count] = this.marker;
        
    }

    sharePublic() {
        delete this.marker.draggable;
        delete this.marker.whom;
        this.marker.when = new Date();
        console.log('Location to be shared: ', this.marker);

        this.userDataService.shareLoc(this.marker).subscribe(
            location => {
                console.log("location save ok: ", location);

                //inserting the markers list ...
                this.markers[this.count] = this.marker;
                this.count = this.markers.length;

                this.shareSuccessMessage = 'Public location saved properly';
            },
            error => {
                console.error("location save error: ", error)
                this.shareSuccessMessage = 'Public lcation save error';
            }
        );
    }

    sharePrivate(userids) {
        //reversing the public share button
        this.isUsersFlag = !this.isUsersFlag;

        console.log(userids.value);
        if(!!userids.value) {
            let user_ids = userids.value.join();
            console.log('whom user_id: ', user_ids);
            delete this.marker.draggable;
            this.marker.when = new Date();
            this.marker.whom = user_ids;
            this.userDataService.shareLoc(this.marker).subscribe(
                location => {
                    console.log("Location save ok: ", location);

                    //inserting the markers list ...
                    this.markers[this.count] = this.marker;
                    this.count = this.markers.length;

                    this.shareSuccessMessage = 'Private location save properly';
                },
                error => {
                    console.error("location save error: ", error)
                    this.shareSuccessMessage = 'Private location save error';
                }
            );
        }
    }

    markerDragEnd(m: Marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    

}
