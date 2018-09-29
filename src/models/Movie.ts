import {Typegoose, prop} from "typegoose";

export class Movie extends Typegoose {
  @prop({ required: true })
  public title: string;
  @prop()
  public year: number;
}

export const MovieModel = (new Movie()).getModelForClass(Movie, {
  schemaOptions: {
    timestamps: true,
  },
});
