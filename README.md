## Task

## DataBase
You can change config info in `.env` file.

## API

- Based on RESTful API interface specification
- Interface basic request address: `/api/v1`

## Test Api
- Use `postman`.
- It's recommended to use vscode extension `Thunder Client`


## User

### Register User

path: `/user/register`

method:`post` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| login | `string`   | Yes       |
| password    | `string`   | Yes       |
| age    | `number`   | Yes      |

Request demo:

```json
{
  "login": "bode",
  "password": "12345Hn&",
  "age": 12
}
```

Response demo：

```json
// success
{
  "code": 0,
  "message": "register successfully",
  "data": {
    "userid": "43ea78f0-7540-11ed-a23b-f5b143989f90"
  }
}
```

### Login

path: `/user/login`

method:`post` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| login | `string`   | Yes       |
| password | `string`   | Yes       |

Request demo:

```json
{
  "login": "BodeHe",
  "password": "23546*Hss"
}
```

Response demo：

```json
// success
{
  "code": 0,
  "message": "login ok",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaW5mbyI6eyJ1c2VybmFtZSI6IkJvZGVIZSIsInBhc3N3b3JkIjoiJDJhJDEwJHdiMmF2d1htQ0RiVkRDSlBXVGc2WU9UTnVsUDFERHVUamNhWE92VVp5N2VOSGx4akVhMjhDIn0sImlhdCI6MTY3MDMxNTU0NiwiZXhwIjoxNjcwMzE2NzQ2fQ.IO4i7u7L6Cqkfglh35DloWx82QYG5xHnoHVwX4DEO6Q"
  }
}
```


### Get User

path: `/user`

method:`get`

- [x] Authorization

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| userid | `string`   | Yes       |

Request demo:

Request Headers
```
authorization: "Bearer xxx"
```

```http
http://localhost:3000/api/v1/user?userid=630c7a00-72e6-11ed-ae06-2f14792d04e8
```

Response demo：

```json
// success
{
  "code": 0,
  "message": null,
  "data": {
    "id": "43ea78f0-7540-11ed-a23b-f5b143989f90",
    "login": "Lihao",
    "age": 45,
    "isDeleted": false
  }
}
```

### Get Users

path: `/user/list`

method:`get` 

- [x] Authorization

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| limit | `number`   | No       |
| loginSubstring | `string`   | No       |

Request demo:

Request Headers
```
authorization: "Bearer xxx"
```

```http
http://localhost:3000/api/v1/users?limit=2&loginSubstring=-4
```

Response demo：

```json
// success
{
  "code": 0,
  "message": null,
  "data": [
    {
      "id": "832ce170-7530-11ed-8ebd-0166200367d7",
      "login": "BodeHe",
      "age": 23,
      "isDeleted": false,
      "groups": [
        {
          "id": "6c5b9e50-753a-11ed-b885-3947be59bae2",
          "name": "C Group",
          "permissions": "READ,WRITE",
          "usersGroups": {
            "id": "6d8e51f0-753a-11ed-b885-3947be59bae2",
            "userid": "832ce170-7530-11ed-8ebd-0166200367d7",
            "groupid": "6c5b9e50-753a-11ed-b885-3947be59bae2"
          }
        }
      ]
    },
    {
      "id": "22a81270-7535-11ed-af4b-47f9077856fb",
      "login": "Jack",
      "age": 30,
      "isDeleted": false,
      "groups": [
        {
          "id": "f8690ae0-753a-11ed-b885-3947be59bae2",
          "name": "D Group",
          "permissions": "READ,WRITE,DELETE,UPLOAD_FILES",
          "usersGroups": {
            "id": "f97041b0-753a-11ed-b885-3947be59bae2",
            "userid": "22a81270-7535-11ed-af4b-47f9077856fb",
            "groupid": "f8690ae0-753a-11ed-b885-3947be59bae2"
          }
        }
      ]
    },
    {
      "id": "74762650-7535-11ed-af4b-47f9077856fb",
      "login": "Ben",
      "age": 45,
      "isDeleted": false,
      "groups": [
        {
          "id": "1c2d3b40-753b-11ed-b885-3947be59bae2",
          "name": "E Group",
          "permissions": "SHARE",
          "usersGroups": {
            "id": "1d65e250-753b-11ed-b885-3947be59bae2",
            "userid": "74762650-7535-11ed-af4b-47f9077856fb",
            "groupid": "1c2d3b40-753b-11ed-b885-3947be59bae2"
          }
        },
        {
          "id": "f557f720-7536-11ed-b5ac-7b434a3c823f",
          "name": "A Group",
          "permissions": "READ,WRITE",
          "usersGroups": {
            "id": "b12b5570-753f-11ed-a287-b973497bc0ba",
            "userid": "74762650-7535-11ed-af4b-47f9077856fb",
            "groupid": "f557f720-7536-11ed-b5ac-7b434a3c823f"
          }
        }
      ]
    },
    {
      "id": "43ea78f0-7540-11ed-a23b-f5b143989f90",
      "login": "Lihao",
      "age": 45,
      "isDeleted": false,
      "groups": []
    },
    {
      "id": "2cdd4ad0-7535-11ed-af4b-47f9077856fb",
      "login": "Wins",
      "age": 40,
      "isDeleted": false,
      "groups": []
    }
  ]
}
```


### Update User

path: `/user`
- [x] Authorization

method:`put` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| userid | `string`   | Yes       |
| login | `string`   | No       |
| password    | `string`   | No       |
| age    | `number`   | No      |

Request demo:

```json
{
  "userid": "630c7a00-72e6-11ed-ae06-2f14792d04e8",
  "login": "bode_he"
}
```

Response demo：

```json
// success
{
  "code": 0,
  "message": "update ok",
  "data": null
}
```


### Remove User

path: `/user`
- [x] Authorization

method:`delete` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| userid | `string`   | Yes       |

Request demo:

```http
{
  userid: "630c7a00-72e6-11ed-ae06-2f14792d04e8"
}
```

Response demo：

```json
// success
{
  "code": 0,
  "message": "remove ok",
  "data": null
}
```


## Group

### Create Group

path: `/group`
- [x] Authorization

method:`post` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| name | `string`   | Yes       |
| permissions | `Array<'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES'>`  | Yes       |
| userIds | `Array<string>`  | No       |

Request demo:

```http
{
  name: "bode's group",
  permissions: ["READ"],
  userIds: [
    "0a4e3f70-730e-11ed-b582-b1169fbd0af7",
    "00853660-730e-11ed-b582-b1169fbd0af7"
  ]
}
```

Response demo：

```json
// success
{
  "code": 0,
  "message": "add ok",
  "data": null
}
```

### Get Group

path: `/group`
- [x] Authorization

method:`get` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| groupid | `string`   | Yes       |

Request demo:

```http
http://localhost:3000/api/v1/groupid?groupid=xxx
```

Response demo：

```json
// success
...
```


### Update Group

path: `/group`
- [x] Authorization

method:`put` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| groupid | `string`   | Yes       |
| name | `string`   | Yes       |
| permissions | `Array<'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES'>`  | Yes       |

Request demo:

```http
{
  groudid: "xx",
  permissions: ["READ", "WRITE"]
}
```

Response demo：

```json
// success
...
```

### Remove Group

path: `/group`
- [x] Authorization

method:`delete` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| groupid | `string`   | Yes       |
Request demo:

```http
{
  groudid: "xx",
}
```

Response demo：

```json
// success
...
```

### Get Groups

path: `/group/list`
- [x] Authorization

method:`get` 

Request demo:

```http
http://localhost:3000/api/v1/group/list
```

Response demo：

```json
// success
{
  "code": 0,
  "message": null,
  "data": [
    {
      "id": "6c5b9e50-753a-11ed-b885-3947be59bae2",
      "name": "C Group",
      "permissions": "READ,WRITE",
      "users": [
        {
          "id": "832ce170-7530-11ed-8ebd-0166200367d7",
          "login": "BodeHe",
          "usersGroups": {
            "id": "6d8e51f0-753a-11ed-b885-3947be59bae2",
            "userid": "832ce170-7530-11ed-8ebd-0166200367d7",
            "groupid": "6c5b9e50-753a-11ed-b885-3947be59bae2"
          }
        }
      ]
    },
    {
      "id": "f8690ae0-753a-11ed-b885-3947be59bae2",
      "name": "D Group",
      "permissions": "READ,WRITE,DELETE,UPLOAD_FILES",
      "users": [
        {
          "id": "22a81270-7535-11ed-af4b-47f9077856fb",
          "login": "Jack",
          "usersGroups": {
            "id": "f97041b0-753a-11ed-b885-3947be59bae2",
            "userid": "22a81270-7535-11ed-af4b-47f9077856fb",
            "groupid": "f8690ae0-753a-11ed-b885-3947be59bae2"
          }
        }
      ]
    },
    {
      "id": "1c2d3b40-753b-11ed-b885-3947be59bae2",
      "name": "E Group",
      "permissions": "SHARE",
      "users": [
        {
          "id": "74762650-7535-11ed-af4b-47f9077856fb",
          "login": "Ben",
          "usersGroups": {
            "id": "1d65e250-753b-11ed-b885-3947be59bae2",
            "userid": "74762650-7535-11ed-af4b-47f9077856fb",
            "groupid": "1c2d3b40-753b-11ed-b885-3947be59bae2"
          }
        }
      ]
    },
    {
      "id": "f557f720-7536-11ed-b5ac-7b434a3c823f",
      "name": "A Group",
      "permissions": "READ,WRITE",
      "users": [
        {
          "id": "74762650-7535-11ed-af4b-47f9077856fb",
          "login": "Ben",
          "usersGroups": {
            "id": "b12b5570-753f-11ed-a287-b973497bc0ba",
            "userid": "74762650-7535-11ed-af4b-47f9077856fb",
            "groupid": "f557f720-7536-11ed-b5ac-7b434a3c823f"
          }
        }
      ]
    },
    {
      "id": "1c36df90-7538-11ed-a460-a1e9dfb82271",
      "name": "B Group",
      "permissions": "READ,WRITE",
      "users": []
    }
  ]
}
```

### Update Group Users

path: `/group/users`
- [x] Authorization

method:`put` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| groupid | `string`   | Yes       |
| userids | `string[]`   | Yes       |
Request demo:

```json
{
  "groupid": "f557f720-7536-11ed-b5ac-7b434a3c823f",
  "userids": [
    "74762650-7535-11ed-af4b-47f9077856fb"
  ]
}
```

Response demo：

```json
// success
{
  "code": 0,
  "message": "update successfully",
  "data": null
}
```