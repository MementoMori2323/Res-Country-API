const dbtn = document.getElementById('Dbtn');
const lbtn = document.getElementById('Lbtn');
const regionsbtn = document.getElementById('regionsbtn');
const regionList = document.getElementById('regionList');

dbtn.addEventListener("click", function() {
    var element = document.body;
    element.classList.toggle('dark-mode');
    dbtn.style.display = 'none';
    element.classList.remove('light-mode');
    lbtn.style.display = 'block';
});

lbtn.addEventListener("click", () => {
    var element = document.body;
    element.classList.toggle('light-mode');
    dbtn.style.display = 'block';
    element.classList.remove('dark-mode');
    lbtn.style.display = 'none';
});

regionsbtn.addEventListener('click', function(){
    regionList.classList.toggle('show')
});

window.onclick = (event) => {
    if(!event.target.matches('.regionsbtn')){
        if(regionList.classList.contains("show")){
            regionList.classList.remove("show")
        }
    }
};

// Function to fetch all countries from the API
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
}

// Function to filter countries based on input text and region
async function filterCountries() {
    const searchInput = document.getElementById('searchbar');
    const countryCards = document.querySelectorAll('.countrycard');

    const searchTerm = searchInput.value.toLowerCase();
    const selectedRegion = document.querySelector('.regionsbtn.active')?.id;

    const countries = await fetchCountries();

    countryCards.forEach((card, index) => {
        const countryName = countries[index].name.common.toLowerCase();
        const countryRegion = countries[index].region.toLowerCase();

        const matchesSearchTerm = countryName.includes(searchTerm);
        const matchesRegion = !selectedRegion || countryRegion === selectedRegion.toLowerCase();

        card.style.display = matchesSearchTerm && matchesRegion ? 'block' : 'none';
    });
}

// Function to create country cards dynamically

async function populateCountryCards() {
  const main = document.querySelector('main');
  const countries = await fetchCountries();

  countries.forEach((country) => {
      const countryCard = document.createElement('div');
      countryCard.className = 'countrycard';
      countryCard.innerHTML = `
        <a href="country_details.html?country=${encodeURIComponent(country.name.common)}">
          <picture>
            <img src="${country.flags.png}" loading="lazy">
          </picture>
          <div class="countryinfo">
            <h3>${country.name.common}</h3>
            <br/>
            <ul>
              <li>Population: ${country.population}</li>
              <li>Region: ${country.region}</li>
              <li>Capital: ${country.capital}</li>
            </ul>
          </div>
        </a>
      `;
      main.appendChild(countryCard);
  });
}

// ... Rest of the code ...


// Fetch and populate country cards on page load
populateCountryCards();

// Create an event listener for each region button
africabtn.addEventListener('click', function() {
    filterByRegion("Africa");
  });
  
  americabtn.addEventListener('click', function() {
    filterByRegion("Americas");
  });
  
  asiabtn.addEventListener('click', function() {
    filterByRegion("Asia");
  });
  
  europebtn.addEventListener('click', function() {
    filterByRegion("Europe");
  });
  
  oceaniabtn.addEventListener('click', function() {
    filterByRegion("Oceania");
  });
  
  // Function to filter and display countries by region
  async function filterByRegion(selectedRegion) {
    const countryCards = document.querySelectorAll('.countrycard');
    const countries = await fetchCountries();
  
    countryCards.forEach((card, index) => {
      const countryRegion = countries[index].region.toLowerCase();
      const matchesRegion = countryRegion === selectedRegion.toLowerCase();
  
      card.style.display = matchesRegion ? 'block' : 'none';
    });
}
