# MovieDB

# Requirements

- NodeJS v8
- MongoDB
- OMDB Api Key - http://www.omdbapi.com/apikey.aspx

# Installation

```bash
npm install
```

# Environment Variables

## Required

```bash
OMDB_API_KEY=yourapikey
DATABASE_URL=yourmongodburl
```

## Optional

```bash
PORT=3010 # defaults to 3000
```

# Test

```bash
npm test
```

# Compile & Run

```bash
npm run build
npm start
```

# Dev run

```bash
npm run start:dev
```

# Routes

## Movies
*POST* /movies

adds the movie to the database. Example body:
```javascript
{
  "title": "The Avengers",
  "year": 2012 // optional
}
```

*GET* /movies

returns list of movies, fetched from the database

*GET* /movies/:id

finds and returns movie by ID

*GET* /movies/:id/info

returns information about the movie

*GET* /movies/:id/comments

returns comments for the movie

## Comments

*POST* /comments

adds the comment to the database. Example body:
```javascript
{
  "movie": "5bae7d19ced9fd6d0117456b",
  "text": "Great movie!",
  "authorName": "Andrew" // optional, defaults to "Anonymous"
}
```

*GET* /comments

returns list of comments from the database
