export const getApiResponse = (url, callback) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result))
    .catch((error) => console.log('error', error));
}