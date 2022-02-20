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
