import { find } from "../omdb";
import * as got from "got";
import * as sinon from "sinon";

describe("omdb", () => {
  const apiKey = "key";

  describe("find", () => {
    const movieTitle = "abc";
    let gotGet: sinon.SinonStub;

    beforeEach(() => {
      gotGet = sinon.stub(got, "get");
    });

    afterEach(() => {
      gotGet.restore();
    });

    it("success", async () => {
      const expectedURL = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`;
      gotGet.withArgs(expectedURL).resolves({
        body: "{}",
      });

      const result = await find(apiKey, {
        t: movieTitle,
      });

      expect(result).toEqual({});

      sinon.assert.calledWith(gotGet, expectedURL);
    });

    it("throws", async () => {
      const expectedURL = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`;
      gotGet.withArgs(expectedURL).resolves({
        body: JSON.stringify({
          Response: "False",
        }),
      });

      await expect(find(apiKey, {
        t: movieTitle,
      })).rejects.toThrow();

      sinon.assert.calledWith(gotGet, expectedURL);
    });
  });
});
