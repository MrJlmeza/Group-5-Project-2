
function buildYelpEarningsRatingsChart() {
  const url = "/api/yelpearningsratings";
  d3.json(url).then(function(response) {
    console.log(response);

    var earningsList = [];
    var ratingsList = [];
    // console.log(response);
    for (var i = 0; i < response.length; i++) {
      ratingsList.push(response[i]["rating"]);
      earningsList.push(response[i]["total"]);
    }

    // var totalMilesDiv = document.getElementById('totalMilesDiv');
    // totalMilesDiv.innerHTML += response.totalMiles;

    // var totalMileagePayDiv = document.getElementById('totalMileagePayDiv');
    // totalMileagePayDiv.innerHTML += response.totalMileagePay;

    //scatter plot for Ratings vs. Earnings

    var trace1 = {
      x: ratingsList,
      y: earningsList,
      mode: 'markers',
      type: 'scatter',
      name: 'Team A',
      text: earningsList,
      marker: { size: 12 }
    };
    
    var data = [ trace1 ];
    
    var layout = {
      xaxis: {
        range: [ 0, 5.5 ]
      },
      yaxis: {
        range: [0, 600]
      }
      // title:'Data Labels Hover'
    };
    
    Plotly.newPlot('EarningsRatingsDiv', data, layout, {responsive: true});

  });

}

function buildYelpEarningsTypeChart(){
  // const url = "/api/milessummarized"; //change api call to the right one as needed
  // d3.json(url).then(function(response) {
  //   // console.log(response);
    

  // });
}


function buildYelpDashboards() {
  buildYelpEarningsRatingsChart();
  buildYelpEarningsTypeChart();
};


buildYelpDashboards();


