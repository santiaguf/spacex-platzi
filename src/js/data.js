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

export const apiBaseUrl = 'https://ll.thespacedevs.com/2.2.0/launch/';