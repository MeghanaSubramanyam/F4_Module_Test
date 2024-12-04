const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

const tableBody = document.getElementById('cryptoTable');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const sortMarketCapButton = document.getElementById('sortMarketCap');
const sortChangeButton = document.getElementById('sortChange');

let cryptoData = [];

// Fetch data using async/await
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    cryptoData = await response.json();
    renderTable(cryptoData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Render table
function renderTable(data) {
  tableBody.innerHTML = '';
  data.forEach((crypto) => {
    const row = `
      <tr>
        <td><img src="${crypto.image}" alt="${crypto.name}" width="32" /></td>
        <td>${crypto.name}</td>
        <td>${crypto.symbol.toUpperCase()}</td>
        <td>$${crypto.current_price.toLocaleString()}</td>
        <td>${crypto.total_volume.toLocaleString()}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Search functionality
searchButton.addEventListener('click', () => {
  const query = searchInput.value.toLowerCase();
  const filteredData = cryptoData.filter((crypto) =>
    crypto.name.toLowerCase().includes(query)
  );
  renderTable(filteredData);
});

// Sort by Market Cap
sortMarketCapButton.addEventListener('click', () => {
  const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sortedData);
});

// Sort by Percentage Change (dummy since percentage change isn't included)
sortChangeButton.addEventListener('click', () => {
  // Assuming the API had a 'percentage_change' field; otherwise, modify as needed
  const sortedData = [...cryptoData].sort((a, b) => b.percentage_change - a.percentage_change);
  renderTable(sortedData);
});

// Fetch data using .then
function fetchDataUsingThen() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      cryptoData = data;
      renderTable(cryptoData);
    })
    .catch((error) => console.error('Error fetching data:', error));
}

// Fetch data initially using async/await
fetchData();
