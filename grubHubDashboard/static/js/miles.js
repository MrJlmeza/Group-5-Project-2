
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
  const url = "/api/milessummarized"; //change api call to the right one as needed
  d3.json(url).then(function(response) {
    // console.log(response);
    

  });
}


function buildDashboards() {
  buildSummarizedData();
  buildMileageVsMilesCorrelation();
};


buildDashboards();


