import * as mongoose from "mongoose";
import config from "../config";

(mongoose as any).Promise = Promise;

export default mongoose.connect(config.database.url, {
  useNewUrlParser: true,
});
