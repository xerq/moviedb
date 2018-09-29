import * as supertest from "supertest";
import * as sinon from "sinon";
import * as omdb from "../../../fetchers/omdb";
import app from "../..";
import config from "../../../config";
import { MovieModel } from "../../../models/Movie";
import { MovieInfoModel } from "../../../models/MovieInfo";
import { CommentModel } from "../../../models/Comment";

describe("movies route", () => {
  const supertestApp = supertest(app);
  let omdbFind: sinon.SinonStub;
  let MovieModelSave: sinon.SinonStub;
  let MovieModelFind: sinon.SinonStub;
  let MovieModelFindById: sinon.SinonStub;
  let MovieInfoModelSave: sinon.SinonStub;
  let MovieInfoModelFind: sinon.SinonStub;
  let CommentModelFind: sinon.SinonStub;

  beforeEach(() => {
    omdbFind = sinon.stub(omdb, "find");
    MovieModelSave = sinon.stub(MovieModel.prototype, "save");
    MovieModelFind = sinon.stub(MovieModel, "find");
    MovieModelFindById = sinon.stub(MovieModel, "findById");
    MovieInfoModelSave = sinon.stub(MovieInfoModel.prototype, "save");
    MovieInfoModelFind = sinon.stub(MovieInfoModel, "find");
    CommentModelFind = sinon.stub(CommentModel, "find");
  });

  afterEach(() => {
    omdbFind.restore();
    MovieModelSave.restore();
    MovieModelFind.restore();
    MovieModelFindById.restore();
    MovieInfoModelSave.restore();
    MovieInfoModelFind.restore();
    CommentModelFind.restore();
  });

  it("POST /", async () => {
    const movieTitle = "abc";
    omdbFind.withArgs(config.omdb.key, {
      t: movieTitle,
    }).resolves({
      Response: "True",
    });
    MovieModelSave.withArgs().resolves();
    MovieInfoModelSave.withArgs().resolves();

    const result = await supertestApp.post("/movies").send({
      title: movieTitle,
    });

    expect(result.status).toEqual(200);
    expect(result.body).toMatchObject({
      data: {
        title: movieTitle,
        _id: expect.any(String),
      },
    });

    sinon.assert.calledWith(omdbFind, config.omdb.key, {
      t: movieTitle,
    });
    sinon.assert.called(MovieModelSave);
    sinon.assert.called(MovieInfoModelSave);
  });

  it("GET /", async () => {
    MovieModelFind.withArgs().resolves([]);

    const result = await supertestApp.get("/movies");

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      data: [],
    });

    sinon.assert.called(MovieModelFind);
  });

  it("GET /:id", async () => {
    const id = "123";
    MovieModelFindById.withArgs(id).resolves({
      _id: id,
    });

    const result = await supertestApp.get(`/movies/${id}`);

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      data: {
        _id: id,
      },
    });

    sinon.assert.calledWith(MovieModelFindById, id);
  });

  it("GET /:id/info", async () => {
    const id = "123";
    MovieInfoModelFind.withArgs({
      movie: id,
    }).resolves({
      movie: id,
    });

    const result = await supertestApp.get(`/movies/${id}/info`);

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      data: {
        movie: id,
      },
    });

    sinon.assert.calledWith(MovieInfoModelFind, {
      movie: id,
    });
  });

  it("GET /:id/comments", async () => {
    const id = "123";
    CommentModelFind.withArgs({
      movie: id,
    }).resolves([]);

    const result = await supertestApp.get(`/movies/${id}/comments`);

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      data: [],
    });

    sinon.assert.calledWith(CommentModelFind, {
      movie: id,
    });
  });
});
