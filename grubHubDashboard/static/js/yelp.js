
function buildYelpEarningsRatingsChart() {
  const url = "/api/yelpearningsratings";
  d3.json(url).then(function(response) {
    // console.log(response);

    var earningsList = [];
    var ratingsList = [];
    // console.log(response);
    for (var i = 0; i < response.length; i++) {
      ratingsList.push(response[i]["rating"]);
      earningsList.push(response[i]["total"]);
    }

    var trace1 = {
      x: ratingsList,
      y: earningsList,
      mode: 'markers',
      type: 'scatter',
      name: 'Team A',
      marker: { size: 12, color: 'rgb(211,35,35)' }
    };
    
    var data = [ trace1 ];
    
    var layout = {
      xaxis: {
        range: [ 0.5, 5.5 ],
        title: {
          text: 'Yelp Ratings',
          font: {
            size: 14,
          }
        },
      },
      yaxis: {
        range: [0, 600],
        title: {
          text: 'Total Earnings (in U.S. Dollars)',
          font: {
            size: 14,
          }
        }
      }
    };
    
    Plotly.newPlot('EarningsRatingsDiv', data, layout, {responsive: true});

  });

}

function buildYelpEarningsTypeChart(){
  const url = "/api/yelpearningstypes";
  d3.json(url).then(function(response) {
    // console.log(response);

    var earningsList = [];
    var typesList = [];
    // console.log(response);
    for (var i = 0; i < response.length; i++) {
      typesList.push(response[i]["type"]);
      earningsList.push(response[i]["total"]);
    }

    var trace1 = {
      x: typesList,
      y: earningsList,
      type: 'bar',
      text: earningsList,
      textposition: 'auto',
      marker: {
        color: 'rgb(211,35,35)'
      }
    };
    
    var data = [ trace1 ];
    
    var layout = {
      font:{
        family: 'Raleway, sans-serif'
      },
      showlegend: false,
      xaxis: {
        tickangle: -45,
        title: {
          text: 'Yelp Restaurant Type',
          font: {
            size: 14,
          }
        },
      },
      yaxis: {
        zeroline: false,
        gridwidth: 2,
        title: {
          text: 'Total Earnings (in U.S. Dollars)',
          font: {
            size: 14,
          }
        },
      },
      bargap :0.05
    };
    
    Plotly.newPlot('EarningsTypeDiv', data, layout, {responsive: true});

  });
}


function buildYelpDashboards() {
  buildYelpEarningsRatingsChart();
  buildYelpEarningsTypeChart();
};


buildYelpDashboards();


