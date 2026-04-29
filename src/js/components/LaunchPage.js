/* eslint-disable no-console */
import { apiBaseUrl, requestData, clearCountdown } from '../data.js';

export const renderLaunchPage = (params) => {
  clearCountdown();

  const app = document.getElementById('app');
  const launchId = params.id || 'bc325945-4bee-4412-84e1-14998b2eba5f';

  app.innerHTML = `
    <section class="view-launch" aria-label="Launch Details">
        <div class="container">
            <div class="row">
                <article id="launch-info" class="card">
                    <div id="launch-container" class="card-container">
                        <h2>🚀 Launch Details</h2>
                        <div id="title-launch-container">
                            <h3 id="title-launch"></h3>
                        </div>
                        <div id="img-launch-container">
                            <img id="img-launch" src="img/astronauta.png" alt="mission logo" loading="lazy" />
                        </div>
                        <div id="date-launch-container">
                            <span>When:</span>
                            <p id="date-launch"></p>
                        </div>
                        <div id="video-launch-container">
                            <iframe title="Mission video" id="video-launch" src="https://www.youtube.com/embed/bvim4rsNHkQ" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div id="details-launch-container">
                            <p id="details-launch"></p>
                        </div>
                        <a href="#/" id="back" class="btn btn-info" aria-label="Go back to home page">← Back to Home</a>
                    </div>
                </article>
            </div>
        </div>
    </section>
  `;

  const launchApiUrl = `${apiBaseUrl}${launchId}/?format=json`;
  requestData(launchId, launchApiUrl, null);
};
