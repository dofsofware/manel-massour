import { AfterViewInit, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RechercheService } from '../service/recherche.service';
import { default as initJs } from 'content/assets/js/index.bundle';
import * as L from 'leaflet';
import $ from 'jquery';

@Component({
  selector: 'jhi-recherche',
  templateUrl: './recherche.component.html',
})
export class RechercheComponent implements AfterViewInit {
  private map: any;

  constructor(protected rechercheService: RechercheService, protected modalService: NgbModal) {}

  ngAfterViewInit(): void {
    initJs();

    // Map initialization
    this.map = L.map('map', { attributionControl: true }).setView([14.656875015645937, -14.833755006747824], 7);
    const OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });
    OpenStreetMap_Mapnik.addTo(this.map);
    // google satellite
    const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      // maxZoom: 13,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    });
    // googleSat.addTo(this.map);

    const baseLayer = {
      'Open Street Map': OpenStreetMap_Mapnik,
      'google Sat': googleSat,
    };
    const options_ = {
      position: 'topleft',
    };

    new L.Control.Layers(baseLayer).setPosition('topleft').addTo(this.map);
    this.map.on('zoomend', () => {
      const zoomLevel = this.map.getZoom();
      if (zoomLevel === 18) {
        googleSat.addTo(this.map);
        this.map.removeLayer(OpenStreetMap_Mapnik);
        this.map.addLayer(googleSat);
      } else {
        OpenStreetMap_Mapnik.addTo(this.map);
        this.map.removeLayer(googleSat);
        this.map.addLayer(OpenStreetMap_Mapnik);
      }
    });

    const urlCoordonnees = new URL(window.location.href);
    if (urlCoordonnees.searchParams.get('lng') && urlCoordonnees.searchParams.get('lat')) {
      // const marker_local_centre = L.icon({
      // 	iconUrl: './images/marker_local_centre.png',
      // 	iconSize: [200, 200],
      // });

      // const marker = L.marker([urlCoordonnees.searchParams.get("lng"), urlCoordonnees.searchParams.get("lat")], {
      // 	 icon: marker_local_centre,
      // });

      // marker.addTo(map).bindPopup("jjjjjj");

      // verifier la longitude et la latitude pass??es depuis url exist dans categories sinon categories = tout
      const lat = urlCoordonnees.searchParams.get('lat');
      const lng = urlCoordonnees.searchParams.get('lng');
      if ($.isNumeric(lat) && $.isNumeric(lng)) {
        const api = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat!}&lon=${lng!}`;
        fetch(api)
          .then(response => response.json())
          .then(json => $('#search').val(json.features[0].properties.display_name));

        this.map.flyTo([urlCoordonnees.searchParams.get('lat'), urlCoordonnees.searchParams.get('lng')], 16);
      } else {
        $('#categories').val('tout');
        const getUrl = window.location;
        const baseUrl = getUrl.protocol + '//' + getUrl.host + '/';
        const monurl = baseUrl + 'recherche';
        window.location.href = monurl;
      }

      const cat = urlCoordonnees.searchParams.get('categories');
      if (cat) {
        // verifier si la categorie pass??e depuis url exist dans categories sinon categories = tout
        if ($('#categories option[value=' + cat + ']').length > 0) {
          $('#categories').val(cat);
        } else {
          $('#categories').val('tout');
          const newurlCoordonnees = new URL(window.location.href);
          newurlCoordonnees.searchParams.set('categories', 'tout');
          window.history.pushState('object or string', 'Recherches', String(newurlCoordonnees));
        }
        // fin verifier si la categorie pass??e depuis url exist dans categories sinon categories = tout

        // on verifier si la categorie possede des pieces ou pas et traite
        if (
          $('#categories').val() === 'terrain' ||
          $('#categories').val() === 'chambre' ||
          $('#categories').val() === 'hangar' ||
          $('#categories').val() === 'verger'
        ) {
          $('#nbpiecesBox').hide(0);
          $('#catBox').removeClass('col-sm-12 col-lg-6 col-md-6');
          $('#catBox').addClass('col-12');
        } else {
          $('#nbpiecesBox').show(500);
          $('#catBox').removeClass('col-12');
          $('#catBox').addClass('col-sm-12 col-lg-6 col-md-6');
        }
        // fin on verifier si la categorie possede des pieces ou pas et traite
      }
    } else {
      window.history.pushState('object or string', 'Recherches', 'recherche');
    }

    const nbP = urlCoordonnees.searchParams.get('nbp');
    if (nbP) {
      // verifier si le nbp pass??e depuis url exist dans nbPieces sinon nbPieces = tout
      if ($('#nbpieces option[value=' + nbP + ']').length > 0) {
        $('#nbpieces').val(nbP);
      } else {
        $('#nbpieces').val('tout');
        const newurlCoordonnees = new URL(window.location.href);
        newurlCoordonnees.searchParams.set('nbp', 'tout');
        window.history.pushState('object or string', 'Recherches', String(newurlCoordonnees));
      }
      // fin verifier si le nbp pass??e depuis url exist dans nbPieces sinon nbPieces = tout
    }

    $(function () {
      // let elementRechercher = document.getElementById("result");
      const btnRechercher = document.getElementById('rechercher');
      // let elementCategorie = document.getElementById("categories");

      btnRechercher!.addEventListener('click', () => {
        // window.location.href = encodeURI(elementRechercher!.val+"&categories="+elementCategorie.value);
      });

      $('#plusDeCriteres').on('click', function () {
        if ($('.PlusDeCriteres_').is(':visible')) {
          $('.PlusDeCriteres_').hide(500);
        } else {
          $('.PlusDeCriteres_').show(500);
        }
      });

      $('#budget').on('click', function () {
        if ($('#budget_min').is(':visible')) {
          $('#budget_min').hide(500);
        } else {
          $('#budget_min').show(500);
        }
        if ($('#budget_max').is(':visible')) {
          $('#budget_max').hide(500);
        } else {
          $('#budget_max').show(500);
        }
      });

      $('#filtre').on('click', function () {
        if ($('#filtre_').is(':visible')) {
          $('#filtre_').slideToggle(500);
        } else {
          $('#filtre_').slideToggle(500);
        }
      });

      $('#sansCarte').on('click', function () {
        if ($('#carte').is(':visible')) {
          $('#carte').animate({ left: '-100%' });
          $('#carte').hide(500);
          $('#carte').animate({ left: '0' });
          $('#resultat').removeClass('col-lg-5');
          $('#resultat').addClass('container');
          $('.grilleVersion2').removeClass('col-md-6');
          $('.grilleVersion2').addClass('col-md-4');
        } else {
          $('#carte').show(500);
          $('#resultat').removeClass('container');
          $('#resultat').addClass('col-lg-5');
          $('.grilleVersion2').removeClass('col-md-4');
          $('.grilleVersion2').addClass('col-md-6');
        }
      });
    });
    $('.skeleton-content').delay(3000).fadeOut('slow');
  }

  goto(): void {
    const cat = $('#categories').val();
    const lat = $('#lng').val();
    const lng = $('#lat').val();

    if ($('#lat').val() !== '' || $('#lng').val() !== '') {
      this.map.flyTo([$('#lng').val(), $('#lat').val()], 16);
    }
    const urlCoordonnees = new URL(window.location.href);
    urlCoordonnees.searchParams.set('lat', String(lat));
    urlCoordonnees.searchParams.set('lng', String(lng));
    urlCoordonnees.searchParams.set('categories', String(cat));
    window.history.pushState('object or string', 'Recherches', String(urlCoordonnees));
  }

  // quand on choisit une categorie
  change(): void {
    // on desactive l'option nombre de pi??ces
    const urlCoordonnees = new URL(window.location.href);
    const cat = $('#categories').val();
    const lat = urlCoordonnees.searchParams.get('lat');
    const lng = urlCoordonnees.searchParams.get('lng');
    const nbP = urlCoordonnees.searchParams.get('nbp');
    if (
      $('#categories').val() === 'terrain' ||
      $('#categories').val() === 'chambre' ||
      $('#categories').val() === 'hangar' ||
      $('#categories').val() === 'verger'
    ) {
      $('#nbpieces').val('tout');
      if (nbP !== null) {
        urlCoordonnees.searchParams.delete('nbp');
      }
      $('#nbpiecesBox').hide(0);
      $('#catBox').removeClass('col-sm-12 col-lg-6 col-md-6');
      $('#catBox').addClass('col-12');
    } else {
      $('#nbpiecesBox').show(500);
      $('#catBox').removeClass('col-12');
      $('#catBox').addClass('col-sm-12 col-lg-6 col-md-6');
    }
    // fin on desactive l'option nombre de pi??ces

    if (lat === '' || lng === '' || lat === null || lng === null) {
      urlCoordonnees.searchParams.append('lat', '14.656875015645937');
      urlCoordonnees.searchParams.append('lng', '-14.833755006747824');
      this.map.flyTo([14.656875015645937, -14.833755006747824], 7);
      urlCoordonnees.searchParams.set('categories', String(cat));
    } else {
      urlCoordonnees.searchParams.set('categories', String(cat));
    }

    window.history.pushState('object or string', 'Recherches', String(urlCoordonnees));
  }

  // quand on choisit le nom de pieces
  changeNbPieces(): void {
    const urlCoordonnees = new URL(window.location.href);
    const nbP = urlCoordonnees.searchParams.get('nbp');
    if (nbP === null) {
      urlCoordonnees.searchParams.append('nbp', String($('#nbpieces').val()));
      window.history.pushState('object or string', 'Recherches', String(urlCoordonnees));
    } else {
      urlCoordonnees.searchParams.set('nbp', String($('#nbpieces').val()));
      window.history.pushState('object or string', 'Recherches', String(urlCoordonnees));
    }
  }
}
