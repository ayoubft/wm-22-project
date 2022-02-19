// the map
var map = L.map("map").setView([30.4937, -6.283], 6);

// Google Earth Hybrid basemap
// L.tileLayer("http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga", {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// OpenStreetMap basemap
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// add Positron basemap
const urlPositron =
  "https://maps.geoapify.com/v1/tile/positron/{z}/{x}/{y}.png?apiKey=b463cc5c1e7a4046af3cf015984e91fa";
function addBM() {
  L.tileLayer(urlPositron, {
    attribution:
      'Powered by <a class="attribution" href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a class="attribution" href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a class="attribution" href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
    maxZoom: 20,
    id: "osm-bright",
  }).addTo(map);
  map.setView([30.4937, -6.283], 6);
}

// first init
addBM();

// toggle function => for the menu like
function hideDiv(e1) {
  var x = document.getElementById(e1);

  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

const panel = document.getElementById("panel");
function show_panel() {
  panel.style.display = "block";
}

const elements = document.getElementsByClassName("info");
const divs = document.getElementsByClassName("DIV");
const btns = document.getElementsByClassName("BTN");

// toggle others
function hide_other_divs(currDiv) {
  reset_all();
  for (let i = 0; i < divs.length; i++) {
    if (divs[i].id != currDiv) {
      divs[i].style.display = "none";
    } else {
      divs[i].style.display = "block";
    }
  }
}

// reset function #to
function reset_all() {
  map.eachLayer(function (layer) {
    if (layer._url != urlPositron) {
      map.removeLayer(layer);
    }
  });

  while (elements.length > 0) elements[0].remove();
  for (var i = 0; i < divs.length; i++) {
    divs[i].style.display = "none";
  }

  panel.style.display = "none";
}

// get the value of the dropdown select for communes
var selectMonthCom, value, geojson;

selectMonthCom = document.getElementById("slctmonth_com");
value = selectMonthCom.options[selectMonthCom.selectedIndex].value;

selectMonthCom.onclick = function changeContent() {
  value = selectMonthCom.options[selectMonthCom.selectedIndex].value;
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });
  addBM();
  geojson = L.geoJson(communes, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);
  info.addTo(map);
  legend.addTo(map);
  map.fitBounds(geojson.getBounds());
};

function getColor(d) {
  return d > 70
    ? "#034e7b"
    : d > 60
    ? "#0570b0"
    : d > 52
    ? "#3690c0"
    : d > 43
    ? "#a6bddb"
    : d > 37
    ? "#a6bddb"
    : d > 30
    ? "#d0d1e6"
    : d > 17
    ? "#ece7f2"
    : "#fff7fb";
}

function style(feature) {
  return {
    fillColor: getColor(feature.properties[value]),
    weight: 0.3,
    opacity: 1,
    color: "gray",
    dashArray: "3",
    fillOpacity: 0.7,
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    // click: zoomToFeature,
  });
}

var legend = L.control({ position: "bottomright" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend"),
    grades = [17, 30, 37, 43, 52, 60, 70],
    labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' +
      getColor(grades[i] + 1) +
      '"></i> ' +
      grades[i] +
      (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  }

  return div;
};

var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
  this.update();
  return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  this._div.innerHTML =
    "<br><h3>🌧️ Précipitation mensuelle</h3>" +
    (props
      ? `Commune : <b>${props.NAME}</b><br />${props[value]} mm </sup>`
      : "Survoler une commune!");
};

function show_statpluv() {
  geojson = L.geoJSON(statpluv, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "<h2><u>" +
          feature.properties.Nom +
          "</h2> </u></font><h3>Bassin : " +
          feature.properties.Bassin +
          "</h3><p>Type : " +
          feature.properties.Type +
          "</p>"
      );
    },
  }).addTo(map);
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

var neighborhoods = L.esri
  .featureLayer({
    url: "https://www.portlandmaps.com/arcgis/rest/services/Public/Zoning/MapServer/32",
    style: {
      color: "#000",
      weight: 1,
      opacity: 0.4,
    },
  })
  .addTo(map);

// create a marker object to query against
var marker = L.marker([45.571034, -122.686386]).addTo(map);

// create a bounds object to query against
var bounds = L.latLngBounds([
  [45.494556, -122.691536],
  [45.5381, -122.608452],
]);

// create a rectangle to visualize the bounds
L.rectangle(bounds, {
  color: "blue",
  weight: 2,
}).addTo(map);

// create a line to query against
var line = L.polyline(
  [
    [45.559256, -122.611885],
    [45.502256, -122.56279],
    [45.483244, -122.620468],
  ],
  {
    color: "blue",
    weight: 2,
  }
).addTo(map);

// create a polygon to query against
var polygon = L.polygon(
  [
    [45.484894, -122.493696],
    [45.512025, -122.492199],
    [45.517669, -122.561457],
    [45.487343, -122.558573],
  ],
  {
    color: "blue",
    weight: 2,
  }
).addTo(map);

// collect geometries into an object so we can reference them later
var geometries = {
  bounds: bounds,
  line: line,
  polygon: polygon,
  point: marker,
};

// get references to our <select> elements
var relationship = document.getElementById("relationSelect");
var geometry = document.getElementById("geometrySelect");
var runQueryButton = document.getElementById("executeQuery");

var previousIds = [];

// reset all features back to their regularly defined styles
function reset() {
  for (var i = previousIds.length - 1; i >= 0; i--) {
    neighborhoods.resetStyle(previousIds[i]);
  }
}
// query the API and highlight features
function query() {
  reset();
  // lookup our input geometry
  var inputGeometry = geometries[geometry.value];

  // query the service executing the selected relation with the selected input geometry
  neighborhoods
    .query()
    [relationship.value](inputGeometry)
    .ids(function (error, ids) {
      // if there is an error with the query, you can handle it here
      if (error) {
        console.log("Error with query: " + error);
      } else if (ids) {
        previousIds = ids;
        for (var i = ids.length - 1; i >= 0; i--) {
          neighborhoods.setFeatureStyle(ids[i], { color: "red", weight: 2 });
        }
      }
    });
}

// query when "Run Query" button is clicked
runQueryButton.addEventListener("click", query);

// once all neighborhoods have loaded run the default query
neighborhoods.once("load", function () {
  query();
});
