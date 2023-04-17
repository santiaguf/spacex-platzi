import { apiBaseUrl, requestData, requestDataAllLaunches } from './data.js';

/* eslint-disable no-console */
const upcomingApi = `${apiBaseUrl}upcoming/?format=json&search=SpaceX&limit=1`;
const upcomingSelector = '-upcoming';

const latestApi = `${apiBaseUrl}previous/?format=json&search=SpaceX&limit=1`;
const latestSelector = '-latest';

const pastLaunchesApi = `${apiBaseUrl}previous/?format=json&search=SpaceX&limit=100`;

requestData('upcoming', upcomingApi, upcomingSelector);
requestData('latest', latestApi, latestSelector);
requestDataAllLaunches(pastLaunchesApi);
