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

  });
}

buildDashboards();
