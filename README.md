# rest-api-mongo

Sample REST API with mongoDB.

## Environment Setup Procedure

### Install Packages

- Install packages based on `package.json`

```
npm install
```

OR

- Install packages based on `package-lock.json`

```
npm ci
```

### Create .env File

Create a `.env` file in the root of the project

- SECRET
  A string used for peppering (for more information on peppering, refer to [here](https://qiita.com/YutaManaka/items/93444c803cf3087af2b5#%E3%83%8F%E3%83%83%E3%82%B7%E3%83%A5%E5%8C%96%E3%81%AE%E3%83%9A%E3%83%83%E3%83%91%E3%83%BCpepper--%E3%82%B7%E3%83%BC%E3%82%AF%E3%83%AC%E3%83%83%E3%83%88%E3%82%BD%E3%83%AB%E3%83%88secret-salt%E3%81%A8%E3%81%AF))
- MONGO_URL
  Use [atlas](https://www.mongodb.com/ja-jp/atlas/database) for the deployed DB URL

```
SECRET=YOUR-SECRET-KEY
MONGO_URL=YOUR-MONGO-URL
```

## How to run

```
npm start
```

## How to Check the API

### Create User

#### URL

POST
`http://localhost:8080/auth/register`

#### RequestBody

```json
{
  "email": "test@example.com",
  "password": "password",
  "userName": "Test User"
}
```

### Login

#### URL

POST
`http://localhost:8080/auth/login`

#### RequestBody

```json
{
  "email": "test@example.com",
  "password": "password"
}
```

### Get all users

#### Caution

Before executing this API, you must log in.

#### URL

GET
`http://localhost:8080/users`

#### RequestBody

None

#### ResponseBody

```json
[
  {
    "_id": "string",
    "userName": "string",
    "email": "string",
    "__v": 0
  }
]
```

### Delete User

#### Caution

Before executing this API, you must log in as the user you intend to delete.

#### URL

DELETE
`http://localhost:8080/users/:id`

#### RequestBody

None

### Update User

#### Caution

Before executing this API, you must log in as the user you intend to update.

#### URL

PATCH
`http://localhost:8080/users/:id`

#### RequestBody

```json
{
  "userName": "Updated User Name"
}
```
