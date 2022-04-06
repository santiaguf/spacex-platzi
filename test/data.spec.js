
import { getApiResponse } from '../src/js/data.js';

const firtsLaunchEndPoint = 'https://api.spacexdata.com/v4/launches/5eb87cd9ffd86e000604b32a';

describe('getApiResponse', () => {
  it('is a function', () => {
    expect(typeof getApiResponse).toBe('function');
  });

  describe("GET / ", () => {
    test("It should respond with an array of students", async () => {
      const response = await getApiResponse(firtsLaunchEndPoint);
      //expect(response.body).toEqual(["Elie", "Matt", "Joel", "Michael"]);
      expect(response.statusCode).toBe(200);
    });
  });

});