
  
   mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/mapbox/streets-v12', // style URL
center:coordinates, // starting position [lng, lat]
zoom: 9 // starting zoom
})


const marker = new mapboxgl.Marker({color:"red"}
    
    ).setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML("<h4><b>Extact Location Will Be Provided After Booking</b></h4>")
    .setMaxWidth("500px"))
   
    .addTo(map); 