import '@pnotify/core/dist/BrightTheme.css';
import { notice, defaultModules } from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/PNotify.css';

import refs from './refs';
import listImage from '../templates/card-img.hbs';

import NewsApiService from './classFromApi';

const { form, gallery, btnLoadMore, btnClear } = refs;
const newsApiService = new NewsApiService();

form.addEventListener('submit', renderOnClick);
btnClear.addEventListener('click', clearOnClick);
btnLoadMore.addEventListener('click', onLoadMore);

async function renderOnClick(e) {
  e.preventDefault();
  clearOnClick();
  btnLoadMore.hidden = false;

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

    return newsApiService.fetchImage().then(renderCardImage);
  } catch (err) {
    return catchError;
  }
}

function renderCardImage(image) {
  let markup = listImage(image);
  gallery.insertAdjacentHTML('beforeend', markup);
}

function onLoadMore() {
  newsApiService.fetchImage().then(renderCardImage);
  setTimeout(() => {
    btnLoadMore.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, 500);
}

function clearOnClick() {
  gallery.innerHTML = '';
}

function catchError() {
  const myNotice = notice({
    text: 'Error 404. Not found',
    modules: new Map([...defaultModules, [PNotifyDesktop, {}]]),
  });
}
