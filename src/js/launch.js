import { apiBaseUrl, requestData } from './data.js';

/* eslint-disable no-console */

// get Launch ID
const DEFAULT_LAUNCH_ID = 'bc325945-4bee-4412-84e1-14998b2eba5f';
const urlString = window.location.href;
const url = new URL(urlString);
const launchId = url.searchParams.get('id') ?? DEFAULT_LAUNCH_ID;

const launchApiUrl = `${apiBaseUrl}${launchId}/?format=json`;

requestData(launchId, launchApiUrl, null);