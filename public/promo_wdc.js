

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

(function() {
  // Create the connector object
  var myConnector = tableau.makeConnector();

  var category = window.location.href.split('/').slice(-1)[0];
  var version = window.location.href.split('/').slice(-2)[0];
  var product = window.location.href.split('/').slice(-3)[0];

  // Define the schema
  myConnector.getSchema = function(schemaCallback) {
    $.getJSON("http://lpwamwebd01:8080/data/"+product+"/"+version+"/"+category+"/data.json" , function(resp) {
      var cols = []
      for(var key in resp[0]) {
        var ds = "";
        if (isNumeric(resp[0][key])){

          ds = tableau.dataTypeEnum.float
        }
        else {
          ds = tableau.dataTypeEnum.string
        }
        cols.push({id: key, dataType: ds})
      }
      const tableSchema = {
        id: "pnpAttributionFeed",
        alias: "Price and Promotion " + category + " Attribution",
        columns: cols
      };
      schemaCallback([tableSchema]);
    })
  };

  // Download the data
  myConnector.getData = function(table, doneCallback) {
    $.getJSON("http://lpwamwebd01:8080/data/"+product+"/"+version+"/"+category+"/data.json", function(resp) {
      var arr = Object.keys(resp).map(function(k) { return resp[k] });
      var tableData = arr;
      table.appendRows(tableData);
      doneCallback();
    });
  };

  tableau.registerConnector(myConnector);

  // Create event listeners for when the user submits the form
  $(document).ready(function() {
    $("#submitButton").click(function() {
      tableau.connectionName = "Promotion Management Data Feed"; // This will be the data source name in Tableau
      tableau.submit(); // This sends the connector object to Tableau
    });
  });
})();