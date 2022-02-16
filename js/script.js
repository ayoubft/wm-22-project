// HTML Elements
const search = document.getElementById("filter");
const matchList = document.querySelector(".collection");
const list = document.getElementById("list");
const indecator1 = document.getElementById("indecator1");
const indecator2 = document.getElementById("indecator2");

// the map
var map = L.map("mapid").setView([29.5, -8], 6);

L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: "abcd",
  maxZoom: 19,
}).addTo(map);

geolayer = L.geoJson(v2018).addTo(map);
