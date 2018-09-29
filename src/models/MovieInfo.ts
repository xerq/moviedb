import { Typegoose, prop, Ref } from "typegoose";
import {Movie} from "./Movie";

export enum MovieInfoSource {
  OMDB = "omdb",
}

export class MovieInfo extends Typegoose {
  @prop({ required: true, ref: Movie })
  public movie: Ref<Movie>;
  @prop({ required: true })
  public source: MovieInfoSource;
  @prop({ required: true })
  public dump: object;
}

export const MovieInfoModel = (new MovieInfo()).getModelForClass(MovieInfo, {
  schemaOptions: {
    timestamps: true,
  },
});
