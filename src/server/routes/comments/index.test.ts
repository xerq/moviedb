import * as supertest from "supertest";
import * as sinon from "sinon";
import {CommentModel} from "../../../models/Comment";
import { MovieModel } from "../../../models/Movie";
import app from "../..";

describe("comments route", () => {
  let CommentModelFind: sinon.SinonStub;
  let CommentModelSave: sinon.SinonStub;
  let MovieModelFindById: sinon.SinonStub;
  const supertestApp = supertest(app);

  beforeEach(() => {
    CommentModelFind = sinon.stub(CommentModel, "find");
    CommentModelSave = sinon.stub(CommentModel.prototype, "save");
    MovieModelFindById = sinon.stub(MovieModel, "findById");
  });

  afterEach(() => {
    CommentModelFind.restore();
    CommentModelSave.restore();
    MovieModelFindById.restore();
  });

  it("GET /", async () => {
    CommentModelFind.withArgs().resolves([]);

    const result = await supertestApp.get("/comments");

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      data: [],
    });

    sinon.assert.calledWithExactly(CommentModelFind);
  });

  it("POST /", async () => {
    const movieID = "123";
    MovieModelFindById.withArgs(movieID).resolves({ _id: movieID });
    CommentModelSave.withArgs().resolves({});

    const result = await supertestApp.post("/comments").send({
      movie: movieID,
      text: "text",
    });

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({
      data: {
        text: "text",
        _id: expect.any(String),
      },
    });

    sinon.assert.calledWithExactly(MovieModelFindById, movieID);
  });

  it("POST / - error, movie not found", async () => {
    const movieID = "123";
    MovieModelFindById.withArgs(movieID).resolves();

    const result = await supertestApp.post("/comments").send({
      movie: movieID,
      text: "text",
    });

    expect(result.body).toHaveProperty("error", true);

    sinon.assert.calledWithExactly(MovieModelFindById, movieID);
  });
});
