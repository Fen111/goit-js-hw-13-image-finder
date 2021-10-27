import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, info, success, error, defaultModules } from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/PNotify.css';
import axios from 'axios';

export default async function fetchImage(searchImage) {
  const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal`;
  let category = `${searchImage}`;
  let page = 1;
  let per_page = 12;
  const apiKey = `23914400-19c57926caa45a402450638cc`;
  let url = BASE_URL + `&q=${category}&page=${page}&per_page=${per_page}&key=${apiKey}`;

  const res = await axios.get(url);
  const data = await res.data;
  const galleryImg = await data.hits;
  if (galleryImg.length === 0) {
    const myNotice = notice({
      text: 'Error 404. Not found',
      modules: new Map([...defaultModules, [PNotifyDesktop, {}]]),
    });
  }
  return galleryImg;
}
