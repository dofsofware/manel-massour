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

      // verifier la longitude et la latitude passées depuis url exist dans categories sinon categories = tout
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

      // verifier si la categorie passée depuis url exist dans categories sinon categories = tout

      const cat = urlCoordonnees.searchParams.get('categories');
      if (cat) {
        if ($('#categories option[value=' + cat + ']').length > 0) {
          $('#categories').val(urlCoordonnees.searchParams.get('categories')!);
        } else {
          $('#categories').val('tout');
          const newurlCoordonnees = new URL(window.location.href);
          newurlCoordonnees.searchParams.set('categories', 'tout');
          window.history.pushState('object or string', 'Recherches', String(newurlCoordonnees));
        }
        // fin verifier si la categorie passée depuis url exist dans categories sinon categories = tout

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
      }
    } else {
      window.history.pushState('object or string', 'Recherches', 'recherche');
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
  }

  goto(): void {
    const cat = $('#categories').val();
    const lat = $('#lng').val();
    const lng = $('#lat').val();

    if ($('#lat').val() !== '' || $('#lng').val() !== '') {
      this.map.flyTo([$('#lng').val(), $('#lat').val()], 16);
    }
    const urlCoordonnees = new URL(window.location.href);
    urlCoordonnees.searchParams.set('categories', String(cat));
    urlCoordonnees.searchParams.set('lat', String(lat));
    urlCoordonnees.searchParams.set('lng', String(lng));
    window.history.pushState('object or string', 'Recherches', String(urlCoordonnees));
  }
  change(): void {
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
    const cat = $('#categories').val();
    // window.history.pushState("object or string", "Recherches", String(cat));
    const urlCoordonnees = new URL(window.location.href);
    const lat = urlCoordonnees.searchParams.get('lat');
    const lng = urlCoordonnees.searchParams.get('lng');
    if (lat === '' || lng === '' || lat === null || lng === null) {
      urlCoordonnees.searchParams.append('lat', '14.656875015645937');
      urlCoordonnees.searchParams.append('lng', '-14.833755006747824');
      this.map.flyTo([14.656875015645937, -14.833755006747824], 7);
    }
    urlCoordonnees.searchParams.set('categories', String(cat));
    window.history.pushState('object or string', 'Recherches', String(urlCoordonnees));
  }
}
