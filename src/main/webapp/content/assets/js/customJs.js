$(document).ready(function () {
  let elementRechercher = document.getElementById('result');
  let btnRechercher = document.getElementById('rechercher');
  let elementCategorie = document.getElementById('categories');

  if (btnRechercher != null) {
    btnRechercher.addEventListener('click', () => {
      window.location.href = encodeURI(elementRechercher.value + '&categories=' + elementCategorie.value);
    });
  }

  $('#testerbtn').on('click', function () {
    alert('ddddd');
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
