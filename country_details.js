const dbtn = document.getElementById('Dbtn');
const lbtn = document.getElementById('Lbtn');

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

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get("country");
    
    if (countryName) {
        const country = await fetchCountryDetails(countryName);
        displayCountryDetails(country);
    } else {
        console.error("Country name not provided in the URL parameters.");
    }
});

async function fetchCountryDetails(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const [country] = await response.json();
        return country;
    } catch (error) {
        console.error('Error fetching country details:', error);
        return null;
    }
}

function displayCountryDetails(country) {
    if (country) {
        const nativeElement = document.getElementById('native');
        const countryNameElement = document.getElementById("country-name");
        const populationElement = document.getElementById("population");
        const regionElement = document.getElementById("region");
        const SubregionElement = document.getElementById('subregion');
        const capitalElement = document.getElementById("capital");
        const tldElement = document.getElementById('tld');
        const currenciesElement = document.getElementById('currencies');
        const languagesElement = document.getElementById('languages');
        const countryFlag = document.getElementById('countryflag');

        nativeElement.textContent = JSON.stringify(country.name);
        countryNameElement.textContent = country.name.common;
        populationElement.textContent = country.population;
        regionElement.textContent = country.region;
        SubregionElement.textContent= country.subregion;
        capitalElement.textContent = country.capital;
        tldElement.textContent =  country.tld;
        currenciesElement.textContent = JSON.stringify(country.currencies);
        languagesElement.textContent = JSON.stringify(country.languages);
        countryFlag.src=`${country.flags.svg}`;

        // Add other details you want to display here
    } else {
        console.error("Country details not found.");
    }
}
