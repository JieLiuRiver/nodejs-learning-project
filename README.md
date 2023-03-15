## Task

## DataBase
use free database: https://customer.elephantsql.com/instance


## API

- Based on RESTful API interface specification
- Interface basic request address: `/api/v1`

## User

### Create User

path: `/user`

method:`post` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| login | string   | Yes       |
| password    | string   | Yes       |
| age    | number   | Yes      |

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
  "message": "insert ok",
  "data": {
    "userid": "b2ebc63f-cf59-452f-9717-a5dbe79d5e8d"
  }
}
```

### Get User

path: `/user`

method:`get` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| userid | string   | Yes       |

Request demo:

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
    "id": "1",
    "login": "jack-1",
    "password": "123",
    "age": 12,
    "isDeleted": false
  }
}
```

### Get Users

path: `/user/list`

method:`get` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| limit | number   | No       |
| loginSubstring | string   | No       |

Request demo:

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
      "id": "4",
      "login": "jack-4",
      "password": "126",
      "age": 15,
      "isDeleted": false
    }
  ]
}
```


### Update User

path: `/user`

method:`put` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| userid | string   | Yes       |
| login | string   | No       |
| password    | string   | No       |
| age    | number   | No      |

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

method:`delete` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| userid | string   | Yes       |

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

method:`post` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| name | string   | Yes       |
| permissions | `Array<'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES'>`  | Yes       |
| userIds | `Array<string>`  | Yes       |

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

method:`get` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| groupid | string   | Yes       |

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

method:`put` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| groupid | string   | Yes       |
| name | string   | Yes       |
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

method:`delete` 

| FieldName   | FieldType | IsRequired |
| -------- | -------- | -------- |
| groupid | string   | Yes       |
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