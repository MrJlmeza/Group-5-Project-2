function hide (elements) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = 'none';
  }
}

function show (elements, specifiedDisplay) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = specifiedDisplay || 'block';
  }
}
function showMain(){
  show(document.getElementById('mainDiv'));
  hide(document.getElementById('mileageAnalysisDiv'));
  hide(document.getElementById('analysisAndInsightsDiv'));
  hide(document.getElementById('yelpInsightsDiv'));
  hide(document.getElementById('viewDatasetDiv'));
  hide(document.getElementById('viewTeamDiv'));
}

function showMilesAnalysis() {
  hide(document.getElementById('mainDiv'));
  show(document.getElementById('mileageAnalysisDiv'));
  hide(document.getElementById('analysisAndInsightsDiv'));
  hide(document.getElementById('yelpInsightsDiv'));
  hide(document.getElementById('viewDatasetDiv'));
  hide(document.getElementById('viewTeamDiv'));
}

function showAnalysisAndInsights() {
  hide(document.getElementById('mainDiv'));
  hide(document.getElementById('mileageAnalysisDiv'));
  show(document.getElementById('analysisAndInsightsDiv'));
  hide(document.getElementById('yelpInsightsDiv'));
  hide(document.getElementById('viewDatasetDiv'));
  hide(document.getElementById('viewTeamDiv'));
}

function showYelpInsights() {
  hide(document.getElementById('mainDiv'));
  hide(document.getElementById('mileageAnalysisDiv'));
  hide(document.getElementById('analysisAndInsightsDiv'));
  show(document.getElementById('yelpInsightsDiv'));
  hide(document.getElementById('viewDatasetDiv'));
  hide(document.getElementById('viewTeamDiv'));
}

function showDataSet() {
  hide(document.getElementById('mainDiv'));
  hide(document.getElementById('mileageAnalysisDiv'));
  hide(document.getElementById('analysisAndInsightsDiv'));
  hide(document.getElementById('yelpInsightsDiv'));
  show(document.getElementById('viewDatasetDiv'));
  hide(document.getElementById('viewTeamDiv'));
}

function showTeam() {
  hide(document.getElementById('mainDiv'));
  hide(document.getElementById('mileageAnalysisDiv'));
  hide(document.getElementById('analysisAndInsightsDiv'));
  hide(document.getElementById('yelpInsightsDiv'));
  hide(document.getElementById('viewDatasetDiv'));
  show(document.getElementById('viewTeamDiv'));
}

function buildSummarizedData() {
  const url = "/api/summarized";
  d3.json(url).then(function(response) {
    // console.log(response);
    var totalEarningsDiv = document.getElementById('totalEarningsDiv');
    totalEarningsDiv.innerHTML += response.totalEarnings;

    var totalDeliveriesDiv = document.getElementById('totalDeliveriesDiv');
    totalDeliveriesDiv.innerHTML += response.totalDeliveries;

    var totalEstablishmentsDiv = document.getElementById('totalEstablishmentsDiv');
    totalEstablishmentsDiv.innerHTML += response.totalEstablishments;

    var totalTipsDiv = document.getElementById('totalTipsDiv');
    totalTipsDiv.innerHTML += response.totalTips;
    // console.log( response.typeCount);

    var valueList = [];
    var labelsList = [];
    Object.keys(response.typeCount).forEach(function(key) {
      valueList.push(response.typeCount[key]);
      labelsList.push(key);
    });

    var trace1 = {
      labels: labelsList,
      values: valueList,
      type: 'pie'
    };

    var data = [trace1];

    // var layout = {
    //   title: "'Bar' Chart",
    // };

    Plotly.newPlot("pieChart", data, {responsive: true});

  });

}

function buildBarChart() {
  const url = "/api/bar";
  d3.json(url).then(function(response) {
    // console.log(response);
    var establishmentList = [];
    var totalList = [];
    // console.log(response);
    for (var i = 0; i < 5; i++) {
      establishmentList.push(response[i]["establishment"]);
      totalList.push(response[i]["total"]);
    }
    var trace1 = {
      x: establishmentList,
      y: totalList,
      type: 'bar',
      marker: {
        color: 'rgb(142,124,195)'
      }
    };
    
    var data = [trace1];
    
    var layout = {
      // title: 'Number of Graphs Made this Week',
      font:{
        family: 'Raleway, sans-serif'
      },
      showlegend: false,
      xaxis: {
        tickangle: -45,
        title: {
          text: 'Establishment',
          font: {
            size: 14,
          }
        }
      },
      yaxis: {
        zeroline: false,
        gridwidth: 2,
        title: {
          text: 'Total Earnings (in U.S. Dollars)',
          font: {
            size: 14,
          }
        }
      },
      bargap :0.05
    };
    
    Plotly.newPlot('establishmentsEarningsBar', data, layout, {responsive: true});

  })

}

function buildMap() {
  var myMap = L.map("EstablishmentsMapDiv", {
    center: [39.96366, -75.59671],
    zoom: 11
  });

  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    // id: "mapbox/streets-v11",
    // accessToken: API_KEY
  }).addTo(myMap);

  // Assemble API query URL
  var url = "/api/establishmentmap";

  // Grab the data with d3
  d3.json(url).then(function(response) {
    console.log(response);

    // Loop through data
    for (var i = 0; i < response.length; i++) {
      // L.circleMarker([response[i]["lat"], response[i]["long"]], {
      //   fillOpacity: 0.75,
      //   color: "white",
      //   fillColor: "purple",
      //   // Setting our circle's radius equal to the output of our markerSize function
      //   // This will make our marker's size proportionate to its population
      //   radius: 5
      // }).bindPopup("<h1>" + response[i]["establishment"] + "</h1>").addTo(myMap);

      // markers.addLayer(L.marker([response[i]["lat"], response[i]["long"]])
      // .bindPopup(response[i]["establishment"]));
      var marker = L.marker([response[i].lat, row.long], {
        opacity: 1
      }).bindPopup(response[i].establishment);
    }

    // Add our marker cluster layer to the map
    // myMap.addLayer(markers);
    
    marker.addTo(map);
    
  });
}

function buildDashboards() {
  
  buildSummarizedData();
  buildBarChart();
  //buildMap();
  
      
}

showMain();
buildDashboards();


