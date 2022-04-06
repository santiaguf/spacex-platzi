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