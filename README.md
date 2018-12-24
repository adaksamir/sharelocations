# sharelocations
to share locations with other users in system

main points:
a. Angular as frontend
b. Node as backend
c. Angular agm plugins for google map plugins
d. matlab for mongodb

STEPS TO INSTALL;: 

1.  git clone to pull the code (frontend and backend)

2.  >_ git clone https://github.com/adaksamir/sharelocations.git
    >_ cd sharelocations

3.  will get two folders
    a. sharelocations (frontend / angular 7)
    b. server (backend / node 6)

4.  setup up mongo db ( i used mlab )
    should have two collections (users & locations)
    mongo db connections string should be replaced in 
    'server/config.js' inside module.exports block

5.  setup google map key, one need to register there in the 
    google cloud console.  There are rate limit, free version 
    will have opeque google map and infrequent reverse geo code feature 
    which is used to get the map pin address from lng and lat

6.  banckend install (npm install)
    a. go to 'cd server/'
    b. run 'npm install'
    c. will download all the dependencies in package.json
    d. run 'node server' to check where all the backend running smoothly

7.  Frontend install
    a. go to 'cd sharelocations'
    b. run 'npm install'
    c. will download all the depdencies in package.json of frontend
    d. run 'ng serve -o' to check frontend is running or not

USAGE: 

1.  register few users (name, email, password; email will be treated as userid)
2.  login yourself
3.  go the locations from the page menu, if it does not redirect to that page
4.  click on the map, to see the pin.  You can click anywhere the pin will shift
    that position.
5.  pin will have info window or marker tooltip, there you will find two buttons
    public share & private share

6.  publick share will only shared that location to yourself.  other can see ofcourse your public 
    share location, if he clicks on 'http://location:4200/locations/adaksamir@gmail.com'

7.  private share will ask for user names to whom you want to share the locations with

FINE TUNED NEEDED:

1.  angular route guards (can activate and router) need to be implemented for smooth operations
2.  socket.io needs to be implemented to see all the logged in users
3.  right now it showing all the users, irrespective who logged in or not
4.  GOOGLE RESERVER GEO CODE feature not working, due to free google api account
    we might need to paid account and put on the code to get the address on pin locations
    right now its only showing name and timestap of location shareed date
5.  

