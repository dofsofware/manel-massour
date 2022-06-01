function autoComp(params) {
  new Autocomplete('search', {
    // default selects the first item in
    // the list of results
    selectFirst: true,

    // The number of characters entered should start searching
    howManyCharacters: 2,

    // onSearch
    onSearch: ({ currentValue }) => {
      // You can also use static files
      // const api = '../static/search.json'
      const api = `https://nominatim.openstreetmap.org/search?format=geojson&countrycodes=sn&limit=5&city=${encodeURI(currentValue)}`;

      /**
       * jquery
       */
      // return $.ajax({
      //     url: api,
      //     method: 'GET',
      //   })
      //   .done(function (data) {
      //     return data
      //   })
      //   .fail(function (xhr) {
      //     console.error(xhr);
      //   });

      // OR -------------------------------

      /**
       * axios
       * If you want to use axios you have to add the
       * axios library to head html
       * https://cdnjs.com/libraries/axios
       */
      // return axios.get(api)
      //   .then((response) => {
      //     return response.data;
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });

      // OR -------------------------------

      /**
       * Promise
       */
      return new Promise(resolve => {
        fetch(api)
          .then(response => response.json())
          .then(data => {
            resolve(data.features);
          })
          .catch(error => {
            console.error(error);
          });
      });
    },
    // nominatim GeoJSON format parse this part turns json into the list of
    // records that appears when you type.
    onResults: ({ currentValue, matches, template }) => {
      const regex = new RegExp(currentValue, 'gi');

      // if the result returns 0 we
      // show the no results element
      return matches === 0
        ? template
        : matches
            .map(element => {
              return `
            <li >
                <p><i class="fa fa-map-marker" aria-hidden="true"></i>
                ${element.properties.display_name.replace(regex, str => `<b >${str}</b>`)}
                </p>
            </li> `;
            })
            .join('');
    },

    // we add an action to enter or click
    onSubmit: ({ object }) => {
      // remove all layers from the map
      const { display_name } = object.properties;
      const [lat, lng] = object.geometry.coordinates;

      const getUrl = window.location;
      const baseUrl = getUrl.protocol + '//' + getUrl.host + '/';
      const monurl = baseUrl + 'recherche?lat=' + lng + '&lng=' + lat;
      $('#result').val(monurl);
      const marker_local_centre = L.icon({
        iconUrl: './images/marker_louer.png',
        iconSize: [200, 200],
      });

      const marker = L.marker([lng, lat], {
        title: display_name,
        icon: marker_local_centre,
      });

      marker.on('mouseover', function (e) {
        this.openPopup();
      });
      marker.on('mouseout', function (e) {
        this.closePopup();
      });
      marker.addTo(map).bindPopup('template');
      // map.flyTo([lng, lat], 12);
    },

    // get index and data from li element after
    // hovering over li with the mouse or using
    // arrow keys ↓ | ↑
    onSelectedItem: ({ index, element, object }) => {
      //console.log("onSelectedItem:", index, element, object);
    },

    // the method presents no results element
    noResults: ({ currentValue, template }) => template(`<li>Pas de résultat: "${currentValue}"</li>`),
  });
} // minimal configure

module.exports = autoComp;
