# Veeva-Test

## Quickstart

1. Install dependencies: `npm ci`
2. Start testdb `npm run testdb` 
3. Start UI: `npm run nx serve analytics`
4. Stars API: `npm run nx serve api`
5. In a browser, open `http://localhost:4200`

## Usage

By default, the UI server listen on port `4200` and the API listen on the port `3333`.

The API endpoints are protected with a JWT, to test queries manually, you can use this token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.1OURXfxWcaT1DOs-abEis6N3RhQfIVWsUjv1VaUyev0` and inject it in the `Authorization` header prefixed with `Bearer `.
To simulate another user, you can encode a new payload (e.g. by using `https://jwt.io/` tool), for that, you need to use the algorithm `HS256` and the secret `veeva`. Here is an example of the payload before encoding (sub is the user identifier):

```json
{
  "sub": "123456789"
}
```

Request example using cURL:

```bash
curl --request GET \
  --url http://localhost:3333/api/page \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.1OURXfxWcaT1DOs-abEis6N3RhQfIVWsUjv1VaUyev0'
```

## API Endpoints

- `GET /api/page`: returns the list of pages defined in the database (this is used in the UI to simplify access to the page statistics)
- `GET /api/stats/page/:pageID/active`: returns the number of unique users having been active on a page identified by `:pageID` (an UUIDv4 identifier) in a given time period (defined with an environment variable in `apps/api/.env`).
- `GET /api/view?countries[]=Germany&countries[]=...&browsers[]=Germany&browsers[]=...`: returns the list of views defined in the database with the possibility to provide optional filters for origin country and client browser
- `GET /api/view/page/:pageID`: returns all the views for a single page.
- `POST /api/view`: Registers a view in the database.

Example Payload:

```json
{
  "pageID": "38f92553-00a3-43d1-91fb-9329ce2f3673", // UUIDv4
  "country": "Germany", // alpha only
  "browser": "Firefox" // can be alphanumeric, useful if version have to be specified
}
```

## Code Organization

Code layers are split in two folders, the folder `apps/analytics` contains the application front-end code, while `apps/api` contains the API source code.

Code that is shared between front-end and back-end (e.g. response interfaces, DTOs, etc) is stored in the `libs/api-interface` folder.

### apps/analytics

Angular with list of pages in *home* and stats for a single page in *page-stats*; API is called via *page.service*

### app/api

NestJS with thin controllers (*page* for pages as such, *view* for page views, *stats* for aggregate statistics - most logic is in *services*); 
