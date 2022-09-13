# Project Title

Simple App with Express JS


# Project Description
In this project, i create a simple app with express js as framework, mongodb  as database, and mongoose as query builder
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`EXPIRE_TIME_KEY`

`API_KEY`


## API Reference
<details open>
<summary>Auth</summary>

### Login
```http
  POST /api/v1/auth/login
```

| Body | Type     | Mandatory                |
| :-------- | :------- | :----------------------- |
| `email` | `string` | **YES**|
| `password` | `string` | **YES**|

### Logout
```http
  POST /api/v1/auth/logout
```

| Body | Type     | Mandatory                |
| :-------- | :------- | :----------------------- |
| `refresh_token` | `string` | **YES**|
| `registration_id` | `string` | **YES**|


### Refresh Token
```http
  POST /api/v1/auth/refresh-token
```

| Body | Type     | Mandatory                |
| :-------- | :------- | :----------------------- |
| `refresh_token` | `string` | **YES**|
| `registration_id` | `string` | **YES**|
</details>

<details open>
<summary>User</summary>

### Get all user

```http
  GET /api/v1/users
```

| Parameter | Type     | Mandatory                |
| :-------- | :------- | :------------------------- |
| `name` | `int` | **NO** |

### Create new user

```http
   POST /api/v1/users
```

| Body | Type     | Mandatory                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **YES** |
| `email`      | `string` | **YES** |
| `type`      | `string` | **YES** |
| `password`      | `string` | **YES** |

### Update user by id
```http
   PUT /api/v1/users/:id
```

| Body | Type     | Mandatory                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **YES** |
| `email`      | `string` | **YES** |
| `type`      | `string` | **YES** |
| `password`      | `string` | **YES** |

### Delete user by id
```http
   DELETE /api/v1/users/:id
```
</details>

<details open>
<summary>Documentation</summary>

[Link Collection](https://www.getpostman.com/collections/6280a9b358158b431d2b)

-Download the postman [here](https://www.postman.com/downloads/)

-Once your app is open, look for the file tab and click on it to open a dropdown menu. In the dropdown menu, look for the import icon and hit it.

-Once you hit the import button, a dialogue box will pop-up on your desktop.

-Please copy the link of the collection you want to import and paste it into the dialog box.

-Using the link, the collection will be imported into Postman automatically.

</details>