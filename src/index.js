import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_Y9CBNzIo8Z5H365pirotGV6whcvLRWT3I9yK7rifRSBDrmOfXYtayGVjfYMYZy8h';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';
const breedSelector = document.querySelector('.breed-select');
const divElem = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorElem = document.querySelector('.error');
function showElem(elem) {
  elem.style.display = 'block';
}
function hideElem(elem) {
  elem.style.display = 'none';
}
function clearDivElem(divElement) {
  divElement.innerHTML = '';
}
hideElem(breedSelector);
hideElem(errorElem);
fetchBreeds()
  .then(breeds => {
    showElem(breedSelector);
    const dFrag = document.createDocumentFragment();
    breeds.forEach(breed => {
      const optionElem = document.createElement('option');
      optionElem.textContent = breed.name;
      optionElem.value = breed.id;
      dFrag.appendChild(optionElem);
    });
    breedSelector.append(dFrag);
  })
  .catch(error => {
    error = Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  })
  .finally(() => {
    hideElem(loader);
  });

breedSelector.addEventListener('change', () => {
  clearDivElem(divElem);
  const selectedBreed = breedSelector.value;
  const documentFrag = document.createDocumentFragment();
  showElem(loader);
  fetchCatByBreed(selectedBreed)
    .then(answ => {
      const [
        {
          url,
          breeds: [{ name, temperament, description }],
        },
      ] = answ;
      const breedImage = document.createElement('img');
      breedImage.src = url;
      breedImage.setAttribute('width', 300);
      breedImage.setAttribute('alt', 'Cat');
      breedImage.setAttribute('style', 'display: none');
      breedImage.setAttribute('onload', "this.style.display='block'");
      const breedName = document.createElement('h2');
      breedName.textContent = name;
      const breedDescription = document.createElement('p');
      breedDescription.textContent = description;
      const temperamentElem = document.createElement('p');
      temperamentElem.textContent = `${temperament}`;
      const boldTemperament = document.createElement('b');
      boldTemperament.textContent = 'Temperament:';
      temperamentElem.prepend(boldTemperament);
      documentFrag.appendChild(breedImage);
      documentFrag.appendChild(breedName);
      documentFrag.appendChild(breedDescription);
      documentFrag.appendChild(temperamentElem);

      divElem.append(documentFrag);
      divElem.style.marginTop = '30px';
    })
    .catch(error => {
      error = Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      hideElem(loader);
    });
});
