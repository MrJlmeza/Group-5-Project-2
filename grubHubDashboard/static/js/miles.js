function buildSummarizedData() {
  const url = "/api/milessummarized";
  d3.json(url).then(function(response) {
    // console.log(response);
    var totalMilesDiv = document.getElementById('totalMilesDiv');
    totalMilesDiv.innerHTML += response.totalMiles;

    var totalMileagePayDiv = document.getElementById('totalMileagePayDiv');
    totalMileagePayDiv.innerHTML += response.totalMileagePay;

  });

}

function buildMileageVsMilesCorrelation(){
  const url = "/api/milesmileagepay"; //change api call to the right one as needed
  d3.json(url).then(function(response) {

    var milesList = [];
    var mileagepayList = [];

    // console.log(response);
    for (var i = 0; i < response.length; i++) {
      milesList.push(response[i]["miles"]);
      mileagepayList.push(response[i]["mileagepay"]);
    }

    //set up chart
    var trace1 = {
      x: milesList,
      y: mileagepayList,
      mode: 'markers',
      type: 'scatter',
      name: 'Team A',
      marker: { size: 12, color: 'rgb(211,35,35)' }
    };
    
    var data = [ trace1 ];
    
    var layout = {
      xaxis: {
        range: [ 0.5, 15 ],
        title: {
          text: 'Miles',
          font: {
            size: 14,
          }
        },
      },
      yaxis: {
        range: [0, 5],
        title: {
          text: 'Mileage Pay (in U.S. Dollars)',
          font: {
            size: 14,
          }
        },
      }
    };
    
    Plotly.newPlot('MilesMileagePayDiv', data, layout, {responsive: true});

  });
}


function buildMilesDashboards() {
  buildSummarizedData();
  buildMileageVsMilesCorrelation();
};


buildMilesDashboards();


