var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map__google'), {
    mapTypeId: google.maps.MapTypeId.HYBRID,
    center: {
      lat: 34.695733, lng: -111.8066438
    },
    zoom: 9,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    streetViewControl: false,
    scrollwheel: false
});
}
