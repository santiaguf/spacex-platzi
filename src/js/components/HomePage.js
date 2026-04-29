/* eslint-disable no-console */
import { apiBaseUrl, requestData, requestDataAllLaunches, clearCountdown } from '../data.js';

export const renderHomePage = () => {
  clearCountdown();

  const app = document.getElementById('app');

  app.innerHTML = `
    <section class="view-home" aria-label="SpaceX Launches">
        <div class="container">
            <div class="row">
                <article id="upcoming" class="card">
                    <div id="upcoming-container" class="card-container">
                        <h2>🚀 Next Launch</h2>
                        <div id="title-upcoming-container">
                            <h3 id="title-upcoming"></h3>
                        </div>
                        <div id="img-upcoming-container">
                            <img id="img-upcoming" src="img/astronauta.png" alt="mission logo" loading="lazy" />
                        </div>
                        <div id="date-upcoming-container">
                            <span>When:</span>
                            <p id="date-upcoming"></p>
                        </div>
                        <div id="countdown-upcoming-container">
                            <span>Countdown:</span>
                            <p id="countdown-upcoming"></p>
                        </div>
                        <p><a class="featured-launches-links" href="" id="more-upcoming" aria-label="View more details about upcoming launch">View full details →</a></p>
                    </div>
                </article>

                <article id="latest" class="card">
                    <div id="latest-container" class="card-container">
                        <h2>🛰️ Last Launch</h2>
                        <div id="title-latest-container">
                            <h3 id="title-latest"></h3>
                        </div>
                        <div id="img-latest-container">
                            <img id="img-latest" src="img/astronauta.png" alt="mission logo" loading="lazy" />
                        </div>
                        <div id="date-latest-container">
                            <span>When:</span>
                            <p id="date-latest"></p>
                        </div>
                        <p><a class="featured-launches-links" href="" id="more-latest" aria-label="View more details about latest launch">View full details →</a></p>
                    </div>
                </article>
            </div>
            <div id="btn-one">
                <button id="past-launches-title" class="btn btn-secondary" aria-expanded="false" aria-controls="past-launches-container">📋 Show Past Launches</button>
            </div>
            <div class="hide" id="past-launches-container" aria-live="polite">
                <nav id="past-launches" class="past-launches" aria-label="Past SpaceX Launches"></nav>
            </div>
        </div>
    </section>
  `;

  const upcomingApi = `${apiBaseUrl}upcoming/?format=json&search=SpaceX&limit=1`;
  const upcomingSelector = '-upcoming';

  const latestApi = `${apiBaseUrl}previous/?format=json&search=SpaceX&limit=1`;
  const latestSelector = '-latest';

  const pastLaunchesApi = `${apiBaseUrl}previous/?format=json&search=SpaceX&limit=100`;

  requestData('upcoming', upcomingApi, upcomingSelector);
  requestData('latest', latestApi, latestSelector);
  requestDataAllLaunches(pastLaunchesApi);

  const btnListPastLaunches = document.getElementById('past-launches-title');
  btnListPastLaunches.addEventListener('click', () => {
    const pastLaunches = document.getElementById('past-launches-container');
    pastLaunches.classList.remove('hide');
    btnListPastLaunches.setAttribute('aria-expanded', 'true');
  });
};
