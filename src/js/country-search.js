
import fetchCountries from './fetchCountries.js';
import getRefs from './get-refs.js';
import { success, info, error } from './pnotify.js';
import singleRenderCountry from '../templates/singleCountryRender.hbs';
import multipleRenderCountry from '../templates/multipleCountryRender.hbs';

const _ = require('lodash');

const refs = getRefs();

refs.searchInput.value = '';

function fullRender(searchQuery) {
    if (searchQuery === '') {
      clearUl();
      return;
    }

    fetchCountries(searchQuery)
      .then(data =>
        data.filter(country => country.name
        .toLowerCase()
        .includes(refs.searchInput.value.toLowerCase()),
        ),
      )
      .then(countriesArray => markupRender(countriesArray))
      .catch(e => {
        // refs.searchInput.value = '';
        clearUl();
        error({
          title: 'Sorry',
          text: e,
        });
      });
  }


  function clearUl() {
    if (refs.searchInput.value === '') {
      refs.cardContainer.innerHTML = '';
    }
  }

  const debounced = _.debounce(() => {
    fullRender(refs.searchInput.value);
  }, 500);
  

  function markupRender(countriesArray) {
    if (countriesArray.length > 1 && countriesArray.length <= 10) {
      refs.cardContainer.innerHTML = '';
      countriesArray.map(country => {
        multipleRender(country);
      });
      success({
        title: 'Success!',
        text: 'Look at the countries on your request',
      });
    } else if (countriesArray.length === 1) {
      refs.cardContainer.innerHTML = '';
      countriesArray.map(country => {
        singleRender(country);
      });
      success({
        title: 'Success!',
        text: 'Country info loaded',
      });
    } else if (countriesArray.length > 10 || countriesArray.length === 0) {
      info({
        text: 'Please enter a more specific query!',
      });
    }
  }

  function multipleRender(country) {
    refs.cardContainer.insertAdjacentHTML(
      'beforeend',
      multipleRenderCountry([...country]),
    );
  }
  
  function singleRender(country) {
    refs.cardContainer.insertAdjacentHTML(
      'beforeend',
      singleRenderCountry([...country]),
    );
  }

  
  refs.searchInput.addEventListener('input', debounced);
  refs.searchContainer.addEventListener('submit', e => e.preventDefault());