let myquery;

const button = document.getElementById('btngetQuery');
button.addEventListener('click', async event => {
  const data = {"q": document.getElementById("searchTxt").value};
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const response = await fetch('/api', options);
  const json = await response.json();
  console.log(json);
});

