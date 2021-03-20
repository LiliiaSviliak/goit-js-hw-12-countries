
const BASE_URL = 'https://restcountries.eu/rest/v2';

export default function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}/name/${searchQuery}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (!data.status) {
        return data;
      }
      throw new Error(`${data.status} ${data.message}`);
    });
}


// const BASE_URL = 'https://restcountries.eu/rest/v2';

// function fetchCountry(name) {
//   return fetch(`${BASE_URL}/name/${name}`).then(response =>
//     response.json(),
//   );
// }

// export default { fetchCountry };



//   const url = 'https://newsapi.org/v2/everything?q=cars';
//   const options = {
//     headers: {
//       Authorization: '4330ebfabc654a6992c2aa792f3173a3',
//     },
//   };
  
//   fetch(url, options)
//     .then(r => r.json())
//     .then(console.log);