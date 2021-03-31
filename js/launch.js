/* eslint-disable no-console */
function printLaunch(result) {
  const title = document.querySelector('#title-launch');
  title.textContent = `${result.name}`;

  const img = document.querySelector('#img-launch');
  let imgUrl = `${result.links.patch.small}`;

  if (imgUrl === 'null' || imgUrl == null) {
    imgUrl = 'img/astronauta.png';
    img.setAttribute('width', '60%');
  }

  img.setAttribute('src', imgUrl);

  const date = document.querySelector('#date-launch');
  date.textContent = `${result.date_local}`;

  const video = document.querySelector('#video-launch');
  const youtubeId = result.links.youtube_id;
  video.setAttribute('src', `https://www.youtube.com/embed/${youtubeId}`);

  const details = document.querySelector('#details-launch');
  details.textContent = `${result.details}`;
}

function getApiData(api) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(api, requestOptions)
    .then((response) => response.json())
    .then((result) => printLaunch(result))
    .catch((error) => console.log('error', error));
}

// get Launch ID
const urlString = window.location.href;
const url = new URL(urlString);
let launchId = url.searchParams.get('id');

// if launch id is not present, we will use first launch id
if (launchId == null || launchId === 'null') {
  launchId = '5eb87cd9ffd86e000604b32a';
}

const apiBaseUrl = `https://api.spacexdata.com/v4/launches/${launchId}`;

getApiData(apiBaseUrl);
