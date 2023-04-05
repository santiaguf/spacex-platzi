import { getApiResponse, apiBaseUrl } from './data.js';

/* eslint-disable no-console */
function printLaunch(result) {
  const title = document.querySelector('#title-launch');
  title.textContent = `${result.name}`;

  const img = document.querySelector('#img-launch');
  let imgUrl = result.mission_patches?.[0]?.image_url || 'img/astronauta.png';

  img.setAttribute('width', '60%');
  img.setAttribute('height', '60%');
  img.setAttribute('alt', 'mission logo');
  img.setAttribute('src', imgUrl);

  const date = document.querySelector('#date-launch');
  date.textContent = `${result.net}`;

  const video = document.querySelector('#video-launch');
  const youtubeUrl = result.vidURLs[0]?.url;
  const youtubeId = youtubeUrl?.split('v=')[1];
  video.setAttribute('src', `https://www.youtube.com/embed/${youtubeId}`);

  const details = document.querySelector('#details-launch');
  details.textContent = `${result.mission.description}`;
}

// get Launch ID
const urlString = window.location.href;
const url = new URL(urlString);
let launchId = url.searchParams.get('id');

// if launch id is not present, we will use first launch id
if (launchId == null || launchId === 'null') {
  launchId = 'bc325945-4bee-4412-84e1-14998b2eba5f';
}

const launchApiUrl = `${apiBaseUrl}${launchId}/?format=json`;

getApiResponse(launchApiUrl)
  .then((result) => printLaunch(result))
  .catch((error) => console.log('error', error));