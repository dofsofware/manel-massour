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
    if (urlCoordonnees.searchParams.get('lng')) {
      // const marker_local_centre = L.icon({
      // 	iconUrl: './images/marker_local_centre.png',
      // 	iconSize: [200, 200],
      // });

      // const marker = L.marker([urlCoordonnees.searchParams.get("lng"), urlCoordonnees.searchParams.get("lat")], {
      // 	 icon: marker_local_centre,
      // });

      // marker.addTo(map).bindPopup("jjjjjj");
      const api = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${urlCoordonnees.searchParams.get(
        'lat'
      )!}&lon=${urlCoordonnees.searchParams.get('lng')!}`; // "https://nominatim.openstreetmap.org/reverse?format=geojson&lat="+urlCoordonnees.searchParams.get("lat")+"&lon="+urlCoordonnees.searchParams.get("lng");
      fetch(api)
        .then(response => response.json())
        .then(json => $('#search').val(json.features[0].properties.display_name));

      this.map.flyTo([urlCoordonnees.searchParams.get('lat'), urlCoordonnees.searchParams.get('lng')], 16);
      if (urlCoordonnees.searchParams.get('categories')) {
        $('#categories').val(urlCoordonnees.searchParams.get('categories')!);
        if ($('#categories').val() === 'terrain' || $('#categories').val() === 'hangar' || $('#categories').val() === 'verger') {
          $('#nbpieces').hide(1);
        } else {
          $('#nbpieces').show(1);
        }
      }
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
}
