// Object containing destinations with their latitude and longitude
var dests = {};
dests['Nord'] = {lat: "43.9214", lon: "11.2271"};
dests['Sud'] = {lat: "43.57304", lon: "11.25204"};
dests['Ovest'] = {lat: "43.7561", lon: "10.9413"};
dests['Est'] = {lat: "43.7688", lon: "11.3006"};

 
// Wait for phonegap to load.
document.addEventListener("deviceready", onDeviceReady, false);
 
// Phonegap is ready.
function onDeviceReady() {}
 
// Function to populate destinations list.
function populateDests()
{
 for (var key in dests) {
 if (key === 'length' || !dests.hasOwnProperty(key)) continue;
 $("#destinations").append('<li><a href="#" onClick="findDest(\'' + key + '\',' + dests[key].lat + ',' + dests[key].lon + ')";>' + key + '</a></li>');
 }
}
 
// Global variables.
var destinationPosition;
var destinationBearing;
var positionId;
var headingId;
var currentPosition;
var currentHeading;
 
// Function to start tracking position and compass when user selects a destination.
function findDest(destination, lat, lon)
{
 $('#destinationText').html(destination);
 
 $('#navView').show();
 $('#mainView').hide();
 
 watchPosition();
 watchHeading();
 
destinationPosition = new LatLon(lat, lon);
 updateScreen();
}
 
// Switches from navigation screen to main screen and disables compass and GPS tracking.
function switchView(){
 $('#navView').hide();
 $('#mainView').show();
 
 if(positionId) navigator.geolocation.clearWatch(positionId);
 if(headingId) navigator.compass.clearWatch(headingId);
}
 
// Function for position tracking.
function watchPosition(){
 if(positionId) navigator.geolocation.clearWatch(positionId);
 positionId = navigator.geolocation.watchPosition(onPositionUpdate, onError, {
 enableHighAccuracy: true,
 timeout: 1000,
 maxiumumAge: 0
 });
}
 
// Function for compass tracking.
function watchHeading(){
 if(headingId) navigator.compass.clearWatch(headingId);
 headingId = navigator.compass.watchHeading(onCompassUpdate, onError, {
 frequency: 100
 });
}
 
// Event handler for position change.
function onPositionUpdate(position){
 currentPosition = new LatLon(position.coords.latitude, position.coords.longitude);
 updateScreen();
}
 
// Event handler for compass change.
function onCompassUpdate(heading){
 currentHeading = heading.trueHeading >= 0 ? Math.round(heading.trueHeading) : Math.round(heading.magneticHeading);
 updateScreen();
}
 
// Function to update information on navigation screen.
function updateScreen(){
 destinationBearing = Math.round(currentPosition.bearingTo(destinationPosition));
 $('#distance').html(Math.round(currentPosition.distanceTo(destinationPosition)*1000) + " Meters");
 
 var degreesOfDiff = destinationBearing - currentHeading; // The difference between destination bearing and current heading is the direction of the arrow.
 
 $('#arrow').css("-webkit-transform", "rotate(" + degreesOfDiff + "deg)");
}
 
// Error handler function.
function onError()
{
 console.log('Error');
}
