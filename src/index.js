import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    const searchCountry = e.target.value.trim();
    if (searchCountry !== '') {
        fetchCountries(searchCountry).then(createCountryMarkup).catch(onError);
    }

    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}

function createCountryMarkup(arr) {
    if (arr.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name');
    return;
    }
    if (2 < arr.length && arr.length < 10) {
        createCountryListMarkup(arr);
        return;
    }

    createCountryInfoMarkup(arr);
}

function createCountryListMarkup(arr) {
    const listMarkup =  arr.map(item => `
    <li>
        <img src="${item.flags.svg}" alt = "flag" width = 50 height = 50>
        <p class ="text">${item.name.official}</p>
    </li>`).join('');
    countryList.innerHTML = listMarkup;
}

function createCountryInfoMarkup(arr) {
    const infoMarkup =  arr.map(item => 
        `<div>
            <img src="${item.flags.svg}" alt = "flag" width = 50 height = 50>
            <p class ="text">${item.name.official}</p>
        </div>
        <p class ="text">Capital: ${item.capital}</p>
        <p class ="text">Population: ${item.population}</p>
        <p class ="text">Languages: ${Object.values(item.languages).join(',')}</p>`);
    countryInfo.innerHTML = infoMarkup;
}

function onError(error) {
    Notify.failure('Oops, there is no country with that name');
}