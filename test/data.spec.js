/* eslint-disable no-undef */

import { getApiResponse } from '../src/js/data.js';

const firtsLaunchEndPoint = 'https://api.spacexdata.com/v4/launches/5eb87cd9ffd86e000604b32a';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ "static_fire_date_unix": 1142553600 }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe('getApiResponse', () => {
  it('is a function', () => {
    expect(typeof getApiResponse).toBe('function');
  });

  it("return static fire date in unix format", async () => {
    const result = await getApiResponse(firtsLaunchEndPoint);

    expect(result).toEqual({ "static_fire_date_unix": 1142553600 });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

});