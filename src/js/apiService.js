import axios from 'axios';
import refs from './refs';
import listImage from '../templates/card-img.hbs';
import fetchImage from './fetchImage';

const { form, input, gallery, btnSearch, btnLoadMore } = refs;

btnSearch.addEventListener('click', e => {
  fetchImage(input.value)
    .then(renderCardImage)
    .catch(err => {
      console.log(err);
    });
});

function renderCardImage(image) {
  let markup = listImage(image);
  gallery.insertAdjacentHTML('afterbegin', markup);
}

btnLoadMore.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
