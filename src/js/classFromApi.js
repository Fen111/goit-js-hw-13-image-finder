import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, info, success, error, defaultModules } from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/PNotify.css';
import axios from 'axios';

export default class newsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchImage() {
    const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal`;
    let per_page = 12;
    const apiKey = `23914400-19c57926caa45a402450638cc`;
    let url =
      BASE_URL + `&q=${this.searchQuery}&page=${this.page}&per_page=${per_page}&key=${apiKey}`;

    const res = await axios.get(url);
    const data = res.data;
    console.log(data);

    const galleryImg = data.hits;

    this.incrementPage();

    if (galleryImg.length === 0) {
      const myNotice = notice({
        text: 'Error 404. Not found',
        modules: new Map([...defaultModules, [PNotifyDesktop, {}]]),
      });
    }
    return galleryImg;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
