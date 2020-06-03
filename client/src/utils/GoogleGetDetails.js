var request = {
    placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    fields: ['name', 'url', 'icon']
};
  
service = new google.maps.places.PlacesService(map);
service.getDetails(request, callback);

function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMarker(place);
    }
}