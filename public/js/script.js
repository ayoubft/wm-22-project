/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//  _      ______          ______ _      ______ _______                            //
// | |    |  ____|   /\   |  ____| |    |  ____|__   __|                           //
// | |    | |__     /  \  | |__  | |    | |__     | |     _ __ ___   __ _ _ __     //
// | |    |  __|   / /\ \ |  __| | |    |  __|    | |    | '_ ` _ \ / _` | '_ \    //
// | |____| |____ / ____ \| |    | |____| |____   | |    | | | | | | (_| | |_) |   //
// |______|______/_/    \_|_|    |______|______|  |_|    |_| |_| |_|\__,_| .__/    //
//                                                                       | |       //
//                                                                       |_|       //
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
var map = L.map("map").setView([30.4937, -6.283], 6);

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

// const panel = document.getElementById("panel");
function show_panel() {
  // panel.style.display = "block";
}

const elements = document.getElementsByClassName("info");
const divs = document.getElementsByClassName("DIV");
const btns = document.getElementsByClassName("BTN");

// toggle others
function hide_other_divs(currDiv) {
  // panel.style.display = "none";
  map.eachLayer(function (layer) {
    if (layer._url != urlPositron) {
      map.removeLayer(layer);
    }
  });

  for (let i = 0; i < divs.length; i++) {
    if (divs[i].id != currDiv) {
      divs[i].style.display = "none";
    }
  }

  while (elements.length > 0) elements[0].remove();
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

  // panel.style.display = "none";
}

// get the value of the dropdown select for communes
var selectMonthCom, value, geojson;

selectMonthCom = document.getElementById("slctmonth_com");
value = selectMonthCom.options[selectMonthCom.selectedIndex].value;

selectMonthCom.onclick = function changeContent() {
  value = selectMonthCom.options[selectMonthCom.selectedIndex].value;
  map.eachLayer(function (layer) {
    if (layer._url != urlPositron) {
      map.removeLayer(layer);
    }
  });
  // addBM();
  geojson = L.geoJson(communes, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);
  info.addTo(map);
  legend.addTo(map);
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
      ? `Commune : <b>${props.NAME}</b><br /> Précipitations: ${Math.round(
          props[value],
          2
        )} mm </sup>`
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

//
var myIcon = L.icon({
  iconUrl: "../css/images/marker-icon.png",
  shadowUrl: "marker-shadow.png",
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//             _____            _____ _______ ______ _____                    //
//             |  __ \    /\    / ____|__   __|  ____|  __ \                  //
//             | |__) |  /  \  | (___    | |  | |__  | |__) |                 //
//             |  _  /  / /\ \  \___ \   | |  |  __| |  _  /                  //
//             | | \ \ / ____ \ ____) |  | |  | |____| | \ \                  //
//             |_|  \_/_/    \_|_____/   |_|  |______|_|  \_\                 //
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

let pal, selectPal, selectMonthRas, valuemonthras;

selectPal = document.getElementById("slctpal");
pal = selectPal.options[selectPal.selectedIndex].value;

function showras(tiff_) {
  fetch(tiff_)
    .then((r) => r.arrayBuffer())
    .then(function (buffer) {
      var s = L.ScalarField.fromGeoTIFF(buffer);
      var layer1 = L.canvasLayer
        .scalarField(s, {
          color: chroma.scale(pal).domain(s.range),
          mouseMoveCursor: null,
        })
        .addTo(map);
      map.fitBounds(layer1.getBounds());
    });
}

selectMonthRas = document.getElementById("slctmonth_ras");

selectMonthRas.onclick = function showRas_2() {
  valuemonthras =
    "data/rasters/" +
    selectMonthRas.options[selectMonthRas.selectedIndex].value;
  map.eachLayer(function (layer) {
    if (layer._url != urlPositron) {
      map.removeLayer(layer);
    }
  });

  selectPal = document.getElementById("slctpal");
  pal = selectPal.options[selectPal.selectedIndex].value;
  showras(valuemonthras);
};

var tiff = "data/rasters/2018_01.tif";

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//   ____  _    _ ______ _____  _____ ______  _____                           //
// /  __ \| |  | |  ____|  __ \|_   _|  ____|/ ____|                          //
// | |  | | |  | | |__  | |__) | | | | |__  | (___                            //
// | |  | | |  | |  __| |  _  /  | | |  __|  \___ \                           //
// | |__| | |__| | |____| | \ \ _| |_| |____ ____) |                          //
// \___\_\\____/|______|_|  \_|_____|______|_____/                            //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

let myquery;
let json3;

const button = document.getElementById("btngetQuery");
button.addEventListener("click", async (event) => {
  let data = { q: document.getElementById("searchTxt").value };
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  let response = await fetch("/api", options);
  let json = await response.json();
  console.log(json);

  let response2 = await fetch("/api");
  let json2 = await response2.json();
  console.log(json2);
  json2.forEach((i) => {
    L.geoJSON(JSON.parse(i.geom), { icon: myIcon }).addTo(map);
  });
});
