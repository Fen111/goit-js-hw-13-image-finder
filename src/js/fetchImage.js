export default function fetchImage(searchImage) {
  const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal`;
  let category = `${searchImage}`;
  let page = 2;
  let per_page = 12;
  const apiKey = `23914400-19c57926caa45a402450638cc`;
  let url = BASE_URL + `&q=${category}&page=${page}&per_page=${per_page}&key=${apiKey}`;

  return fetch(url)
    .then(r => {
      if (r.status === 200) return r.json();
    })
    .then(data => {
      if (data.status === 404) throw new Error(data.status);
      return data.hits;
    });
}
