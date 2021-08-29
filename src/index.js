import { alert, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import countryTpl from './templates/country.hbs';
import countryList from './templates/countryList.hbs';
import fetchCountries from './js/fetchCountries.js';
var debounce = require('lodash.debounce');

const refs = {
    input: document.querySelector("#search"),
    countryContainer: document.querySelector("#country-container"),
    countryList: document.querySelector("#country-list"),
}

refs.input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(e) {
    clearInput();
    const searchQuery = refs.input.value;
    fetchCountries(searchQuery)
    .then(country => {
        if(country.length > 10) {
            error({
                text: 'Too many matches found. Please enter a more specific query!'
              });
        } 
        else if (country.length >= 2 && country.length <= 10) {
            createCountryListMarkup(country);
        }
        else if (country.length === 1) {
            createCountryMarkup(country[0]);
        }
        else {
            alert({
                text: 'Oops! No countries found!'
              });
        }
    })
    .catch(error => console.log(error))
}

function createCountryMarkup(country) {
    refs.countryContainer.insertAdjacentHTML('beforeend', countryTpl(country))
}
function createCountryListMarkup(country) {
    refs.countryList.insertAdjacentHTML('beforeend', countryList(country))
}

function clearInput() {
    refs.countryContainer.innerHTML = '';
    refs.countryList.innerHTML = '';
  }