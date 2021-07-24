function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

function buildDashboards() {

    /* get data route */
  const url = "/api/grubhHubDashboard";
  d3.json(url).then(function(response) {

    console.log(response);
    var establishments = response.map(d =>  d.establishment);
    console.log(establishments);

    var earnings = response.map(d => d.total);

    var lats = response.map(d => d.lat);
    var longs = response.map(d => d.long);
    console.log(lats);
    console.log(longs);
    console.log(earnings);

    var trace = {
      x: establishments,
      y: earnings,
      type: "bar"
    };
    // Create the data array for our plot
    var data = [trace];

    // Define the plot layout
    var layout = {
      xaxis: { title: "Establishments" },
      yaxis: { title: "Total Earned"}
    };

    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("establishmentsEarningsBar", data, layout);

    ///  MAP   //////////////////////////////////////////////
    var map = L.map('EstablishmentsMap', {scrollWheelZoom:false}).setView([39.96366,-75.59671], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    /* Control panel to display map layers */
    var controlLayers = L.control.layers( null, null, {
    position: "topright",
    collapsed: false
    }).addTo(map);

    // display Carto basemap tiles with light features and labels
    var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
    }).addTo(map);

    controlLayers.addBaseLayer(light, 'Carto Light basemap');

    // Terrain tiles
    var terrain = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
    controlLayers.addBaseLayer(terrain, 'Stamen Terrain basemap');

    // Read markers data from data.csv
    //   d3.csv('../newghUTF8.csv').then (function(csvString) {
    //       console.log (csvString)

    //   // Add markers
    //   for (var i in csvString) {
    //     var row = csvString[i];

    //     var marker = L.marker([row.lat, row.long], {
    //       opacity: 1
    //     }).bindPopup(row.establishment);
        
    //     marker.addTo(EstablishmentsMap);
    //   }

    // });
    for (var i = 0; i < establishments.length; i++) {
      var lat = lats[i];
      var long = longs[i];
      var marker = L.marker([lat, long], {
        opacity: 1
      }).bindPopup(establishments[i]);

      marker.addTo(map);
    }
      
  }
)};


buildDashboards();


