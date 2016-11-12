var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map__google'), {
    mapTypeId: google.maps.MapTypeId.HYBRID,
    center: {lat: 34.695733, lng: -111.8066438},
    zoom: 9,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    scrollwheel: false,
    // scaleControl: true,
    // streetViewControl: true,
    // streetViewControlOptions: {
    // position: google.maps.ControlPosition.LEFT_TOP
    // },
    // zoomControl: false,
    // scaleControl: true,
    // disableDefaultUI: true
});
}
