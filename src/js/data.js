
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

export const requestData = (launchId, launchApiUrl) => {
  // check if browser supports localStorage
  if (typeof(Storage) !== 'undefined') {
    // check if there is cahed data for specific launch
    let cachedData = localStorage.getItem(launchId);
    if (cachedData) {
      cachedData = JSON.parse(cachedData);
      printSingleLaunch(cachedData);
    } else {
      // if there is no cached data, we will request it
      getApiResponse(launchApiUrl)
        .then((result) => {
          localStorage.setItem(launchId, JSON.stringify(result));
          printSingleLaunch(result);
        })
        .catch((error) => console.log('error', error));
    }
  } else {
   // if browser does not support localStorage, we will request data
    getApiResponse(launchApiUrl)
      .then((result) => printSingleLaunch(result))
      .catch((error) => console.log('error', error));
  }

}

export const apiBaseUrl = 'https://ll.thespacedevs.com/2.2.0/launch/';