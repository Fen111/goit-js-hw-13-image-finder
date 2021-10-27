import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, info, success, error, defaultModules } from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/PNotify.css';

import refs from './refs';
import listImage from '../templates/card-img.hbs';
import NewsApiService from './classFromApi';

const { form, gallery, btnLoadMore, btnClear, element } = refs;
const newsApiService = new NewsApiService();

form.addEventListener('submit', renderOnClick);
btnClear.addEventListener('click', clearOnClick);
btnLoadMore.addEventListener('click', onLoadMore);

async function renderOnClick(e) {
  e.preventDefault();
  clearOnClick();
  btnLoadMore.disabled = false;

  newsApiService.query = e.currentTarget.elements.query.value;
  newsApiService.resetPage();

  try {
    if (!newsApiService.query) {
      const myNotice = notice({
        text: 'Enter your search term!',
        modules: new Map([...defaultModules, [PNotifyDesktop, {}]]),
      });
      return myNotice;
    }

    const image = newsApiService.fetchImage();

    return image.then(renderCardImage);
  } catch (err) {
    return catchError;
  }
}

function renderCardImage(image) {
  let markup = listImage(image);
  gallery.insertAdjacentHTML('afterbegin', markup);
}

function onLoadMore() {
  newsApiService.fetchImage().then(renderCardImage);
}

form.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});

function clearOnClick() {
  gallery.innerHTML = '';
  btnLoadMore.disabled = true;
}

function catchError() {
  const myNotice = notice({
    text: 'Error 404. Not found',
    modules: new Map([...defaultModules, [PNotifyDesktop, {}]]),
  });
}
