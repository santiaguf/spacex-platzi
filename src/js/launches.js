import { getApiResponse, apiBaseUrl, requestData } from './data.js';

/* eslint-disable no-console */

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
  const launchesDiv = document.querySelector('#past-launches');
  Object.keys(result).forEach((k) => launchesDiv.appendChild(createElement(result[k], k)));
}

const upcomingApi = `${apiBaseUrl}upcoming/?format=json&search=SpaceX&limit=1`;
const upcomingSelector = '-upcoming';

const latestApi = `${apiBaseUrl}previous/?format=json&search=SpaceX&limit=1`;
const latestSelector = '-latest';

const pastLaunchesApi = `${apiBaseUrl}previous/?format=json&search=SpaceX&limit=100`;

requestData('upcoming', upcomingApi, upcomingSelector);
requestData('latest', latestApi, latestSelector);

getApiResponse(pastLaunchesApi)
  .then((result) => printPastLaunchesList(result.results))
  .catch((error) => console.log('error', error));
