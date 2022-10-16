const BASE_URL = 'https://restcountries.com/v3.1/name/';

export const fetchCountries = function fetchCountries(name) {
    return fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`)
        .then(responce => {
            if (!responce.ok){
                throw new Error();
            }
            return responce.json();
        })
}
