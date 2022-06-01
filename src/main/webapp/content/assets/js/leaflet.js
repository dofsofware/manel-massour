// import * as proprities_ from './proprietes.js';

$(document).ready(function () {
  $('#filtre').hide(700);
  // Map initialization
  const map = L.map('map', { attributionControl: true }).setView([14.656875015645937, -14.833755006747824], 7);

  /*==============================================
	  TILE LAYER and WMS
================================================*/
  const OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
  // OpenStreetMap_Mapnik.addTo(map);

  const OSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution:
      '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
  console.log('OSM===============================================================');
  console.log(OSM);
  OSM.addTo(map);

  // google street
  const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    // maxZoom: 13,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  });
  //  googleStreets.addTo(map);

  //google satellite
  const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    // maxZoom: 13,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  });
  //  googleSat.addTo(map)

  var wms = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'geoapp:admin',
    format: 'image/png',
    transparent: true,
    attribution: 'wms test',
  });

  /*==============================================
		  MARKER
================================================*/
  // var marker_louer = L.icon({
  // 	iconUrl: '../images/marker_vendre.png',
  // 	iconSize: [25, 25],
  // });
  // var marker_vendre = L.icon({
  // 	iconUrl: '../images/marker_vendre.png',
  // 	iconSize: [25, 25],
  // });
  // var singleMarker = L.marker([14.656875015645937, -14.833755006747824], { icon: marker_louer, draggable: false });
  /*var popup = singleMarker.bindPopup('This is the Nepal. ' + singleMarker.getLatLng()).openPopup()
popup.addTo(map);*/

  // template popup
  // const template = `
  // <div class="card__image card__box-v1" style="background-color: #FFF; width:450px!important; height: 127px!important">
  //                                   <div class="row no-gutters" >
  //                                     <div class="col-4" style="margin:0!important; padding:0!important">
  //                                       <div class="card__image__header " style=" height: 125px!important">
  //                                         <a href="#">
  //                                           <div class="ribbon">
  //                                             Bail</div>
  //                                           <img src="images/1.jpg" alt="" class="img-fluid w100 img-transition">
  //                                           <div class="info">à vendre</div>
  //                                         </a>
  //                                       </div>
  //                                     </div>
  //                                     <div class="col-4" >
  //                                       <div class="card__image__body" >

  //                                         <span class="badge badge-primary text-capitalize mb-2">Maison</span>

  //                                         <ul class="list-inline card__content">
  //                                           <li class="list-inline-item">

  //                                             <span>
  //                                               <i class="fa fa-bath"></i> 2
  //                                             </span>
  //                                           </li>
  //                                           <li class="list-inline-item">
  //                                             <span>
  //                                               <i class="fa fa-bed"></i> 5
  //                                             </span>
  //                                           </li>
  //                                           <li class="list-inline-item">
  //                                             <span>
  //                                               <i class="fa fa-inbox"></i> 1
  //                                             </span>
  //                                           </li>
  //                                           <li class="list-inline-item">
  //                                             <span>
  //                                               <i class="fa fa-map"></i> 4300 m<sup>2</sup>
  //                                             </span>
  //                                           </li>
  //                                         </ul>
  //                                       </div>
  //                                     </div>
  //                                     <div class="col-md-4 col-lg-3 col-xl-3 my-auto card__image__footer-first">
  //                                       <div class="card__image__footer">
  //                                         <ul class="list-inline my-auto ml-auto price">
  //                                           <li class="list-inline-item ">

  //                                             <h6>25.000.000 Fcfa</h6>
  //                                           </li>

  //                                         </ul>
  //                                       </div>
  //                                     </div>
  //                                   </div>
  //                                 </div>
  // `;
  //marker on hover
  // singleMarker.bindPopup(template);
  // singleMarker.on('mouseover', function (e) {
  // 	this.openPopup();
  // });
  // singleMarker.on('mouseout', function (e) {
  // 	this.closePopup();
  // });
  // singleMarker.on('click', function (e) {
  // 	// map.setView([e.latlng.lat, e.latlng.lng], 11);
  // 	map.flyTo([e.latlng.lat, e.latlng.lng], 12);
  // });
  // singleMarker.addTo(map);
  // var secondMarker = L.marker([14.693425, -17.447938], { icon: marker_vendre, draggable: true });
  // secondMarker.on('click', function (e) {
  // 	map.flyTo([e.latlng.lat, e.latlng.lng], 12);
  // });

  // secondMarker.addTo(map);

  /*==============================================
		LEAFLET EVENTS
================================================*/
  map.on('mouseover', function () {
    //console.log('your mouse is over the map')
  });

  map.on('mousemove', function (e) {
    //document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: ' + e.latlng.lat + 'lng: ' + e.latlng.lng;
    //console.log('lat: ' + e.latlng.lat, 'lng: ' + e.latlng.lng)
  });

  const urlCoordonnees = new URL(window.location.href);
  if (urlCoordonnees.searchParams.get('lng') != undefined) {
    // const marker_local_centre = L.icon({
    // 	iconUrl: './images/marker_local_centre.png',
    // 	iconSize: [200, 200],
    // });

    // const marker = L.marker([urlCoordonnees.searchParams.get("lng"), urlCoordonnees.searchParams.get("lat")], {
    // 	 icon: marker_local_centre,
    // });

    // marker.addTo(map).bindPopup("jjjjjj");
    map.flyTo([urlCoordonnees.searchParams.get('lng'), urlCoordonnees.searchParams.get('lat')], 16);
  }

  /*==============================================
		STYLE CUSTOMIZATION
================================================*/
});
