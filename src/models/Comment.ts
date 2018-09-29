import { Typegoose, Ref, prop } from "typegoose";
import { Movie } from "./Movie";

export class Comment extends Typegoose {
  @prop({ required: true, ref: Movie })
  public movie: Ref<Movie>;
  @prop({ default: "Anonymous" })
  public authorName: string;
  @prop({ required: true })
  public text: string;
}

export const CommentModel = (new Comment()).getModelForClass(Comment);
