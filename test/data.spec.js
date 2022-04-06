
import { getApiResponse } from '../src/js/data.js';

//const firtsLaunchEndPoint = 'https://api.spacexdata.com/v4/launches/5eb87cd9ffd86e000604b32a';

describe('getApiResponse', () => {
  it('is a function', () => {
    expect(typeof getApiResponse).toBe('function');
  });

});