function buildDashboards() {

    /* get data route */
  const url = "/api/grubhHubDashboard";
  d3.json(url).then(function(response) {

    console.log(response);

    
  });
}

buildDashboards();

// Stacked Bar Chart
d3.csv("./grubhubBriefupdated.csv", function(data) {
  for (var i = 0; i < data.length; i++) {
      console.log(data[i].establishment);
      console.log(data[i].type);
      console.log(data[i].rating)
  }
});



