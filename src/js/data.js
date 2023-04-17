
const getCountDownTimer = (launchDate) => {
  // Set the date we're counting down to
  const countDownDate = new Date(launchDate).getTime();
  // Update the count down every 1 second
  const x = setInterval(() => {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="countdown-upcoming"
    document.getElementById('countdown-upcoming').innerHTML = `${days}days ${hours}hours ${minutes}minutes ${seconds}seconds `;

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById('countdown-upcoming').innerHTML = 'EXPIRED';
    }
  }, 1000);
}

const printHomeLaunch = (result, selector) => {
  const title = document.querySelector(`#title${selector}`);
  title.textContent = `${result.results[0].name}`;

  const img = document.querySelector(`#img${selector}`);
  let imgUrl = result.results[0]?.mission_patches?.image_url || 'img/astronauta.png';
  img.setAttribute('width', '60%');
  img.setAttribute('height', '60%');
  img.setAttribute('alt', 'mission logo');
  img.setAttribute('src', imgUrl);

  const date = document.querySelector(`#date${selector}`);
  date.textContent = `${result.results[0].net}`;

  const moreInfo = document.querySelector(`#more${selector}`);
  moreInfo.setAttribute('href', `launch.html?id=${result.results[0].id}`);

  if (selector === '-upcoming') {
    getCountDownTimer(result.results[0].net);
  }
}

const printSingleLaunch = (result) => {
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

function createElement(launch, count) {
  const div = document.createElement('div');
  div.setAttribute('id', `card-${count}`);
  div.setAttribute('class', 'launch-title-card');

  const link = document.createElement('a');
  link.setAttribute('id', `link-${count}`);
  link.setAttribute('class', 'badge badge-secondary');
  link.setAttribute('href', `launch.html?id=${launch.id}`);
  div.appendChild(link);

  const launchNumber = parseInt(count, 10) + 1;

  const paragraph = document.createElement('p');
  paragraph.setAttribute('id', `item-${count}`);
  paragraph.textContent = `${launchNumber}. ${launch.name}`;
  link.appendChild(paragraph);

  return div;
}

function printPastLaunchesList(result) {
  const launches = result.results;
  const launchesDiv = document.querySelector('#past-launches');
  Object.keys(launches).forEach((k) => launchesDiv.appendChild(createElement(launches[k], k)));
}

const printLaunch = (result, selector) => selector === null ? printSingleLaunch(result) : printHomeLaunch(result, selector);

export const getApiResponse = async (url) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(url, requestOptions);
    const jsonResult = await response.json();
    return jsonResult;
  } catch (error) {
    return `error: ${error}`;
  }
}

const isStorageAvailable = () => typeof(Storage) !== 'undefined';

const handleApiLimit = (launchId, result, selector) => {
  if (result.detail) {
    const responseObjet = {
      name: result.detail,
      results: [{
          name: result.detail},
      ]
    };
    printLaunch(responseObjet, selector);
  } else {
    if (isStorageAvailable()) localStorage.setItem(launchId, JSON.stringify(result));
    printLaunch(result, selector);
  }
}

const handleApiLimitAllLaunches = (result) => {
  if (result.detail) {
    const responseObjet = {
      name: result.detail,
      results: [{
          name: result.detail},
      ]
    };
    printPastLaunchesList(responseObjet);
  } else {
    if (isStorageAvailable()) localStorage.setItem('allLaunches', JSON.stringify(result));
    printPastLaunchesList(result);
  }
}

export const requestData = (launchId, launchApiUrl, selector) => {
  let cachedData = localStorage.getItem(launchId);
  if (!isStorageAvailable() || !cachedData) {
      getApiResponse(launchApiUrl)
        .then((result) => {
          handleApiLimit(launchId, result, selector);
        })
        .catch((error) => console.log('error', error));
    } else {
    cachedData = JSON.parse(cachedData);
    printLaunch(cachedData, selector);
  }
}

export const requestDataAllLaunches = (launchApiUrl) => {
  let cachedData = localStorage.getItem('allLaunches');
  if (!isStorageAvailable() || !cachedData) {
      getApiResponse(launchApiUrl)
        .then((result) => handleApiLimitAllLaunches(result))
        .catch((error) => console.log('error', error));
    } else {
    cachedData = JSON.parse(cachedData);
    printPastLaunchesList(cachedData);
  }
}

export const apiBaseUrl = 'https://ll.thespacedevs.com/2.2.0/launch/';