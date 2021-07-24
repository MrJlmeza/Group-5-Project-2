// function unpack(rows, index) {
//   return rows.map(function(row) {
//     return row[index];
//   });
// }

function buildDashboards() {

    /* get data route */
  const url = "/api/grubhHubDashboard";
  d3.json(url).then(function(response) {

    console.log(response);

    // var highPrices = unpack(response.establishment, 2);
    // console.log(highPrices);
    
  });
}

buildDashboards();
