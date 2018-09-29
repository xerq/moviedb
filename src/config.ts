export default {
  server: {
    port: process.env.PORT || 3000,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  omdb: {
    key: process.env.OMDB_API_KEY,
  },
};
