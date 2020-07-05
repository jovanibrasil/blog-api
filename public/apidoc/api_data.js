define({ "api": [
  {
    "type": "post",
    "url": "/token",
    "title": "",
    "group": "Credential",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "{",
          "content": "{\n    \"email\": \"user@email.com\",\n    \"password\": \"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Authenticated user token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\"token\": xyz.abc.123.hgf}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Authentication errror",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/token-routes.js",
    "groupTitle": "Credential",
    "name": "PostToken"
  },
  {
    "type": "get",
    "url": "/tasks",
    "title": "",
    "group": "Tasks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"Authotization\": \"Bearer xyz.abc.123.hgf\" }",
          "type": "json"
        },
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[{\n    \"id\": 1,\n    \"title\": \"Estudar\",\n    \"done\": \"false\",\n    \"updatedAt\": \"2010-09-12T12:45:43.324Z\",\n    \"createdAt\": \"2010-09-12T12:45:43.324Z\",\n    \"user_id\": 1\n}]",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "tasks",
            "description": "<p>Task list</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tasks.id",
            "description": "<p>Task identification</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/tasks-routes.js",
    "groupTitle": "Tasks",
    "name": "GetTasks"
  }
] });
