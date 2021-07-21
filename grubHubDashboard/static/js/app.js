function buildDashboards() {

    /* get data route */
  const url = "/api/grubhHubDashboard";
  d3.json(url).then(function(response) {

    console.log(response);

    
  });
}

buildDashboards();
