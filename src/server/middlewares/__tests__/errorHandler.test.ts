import errorHandler from "../errorHandler";
import * as sinon from "sinon";

describe("errorHandler", () => {
  it("sends error", () => {
    const res = {
      send: sinon.stub(),
    };

    const error = new Error("test error");
    errorHandler(error, null, res as any, null);

    sinon.assert.calledWith(res.send, {
      error: true,
      message: error.message,
    });
  });
});
