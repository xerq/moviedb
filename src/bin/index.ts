import server from "../server";
import database from "./database";
import config from "../config";

(async () => {
  await database;

  server.listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}`));
})();
