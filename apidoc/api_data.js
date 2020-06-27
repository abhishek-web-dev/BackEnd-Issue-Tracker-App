define({ "api": [
  {
    "group": "create",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/create/message",
    "title": "api to create a new message",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as a body parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senderId",
            "description": "<p>sender id to create a new mesage.(Send senderId as a body parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message to create a new mesage.(Send message as a body parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "senderName",
            "description": "<p>sender name to create a new mesage.(Send senderName as a body parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "queryId",
            "description": "<p>query Id to create a new mesage.(Send senderId as a body parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    {\n  \"error\": false,\n  \"message\": \"Message created Successfully\",\n  \"status\": 200,\n  \"data\": {\n      createdOn:2020-06-20T00:56:22.000+00:00\n      messageId:\"7GpzIZ5jc\"\n      queryId:\"7GpzIZpld\"\n      message:\"edited\"\n      senderName:\"abhishek\"\n      senderId:\"Sw-vulMJ6\"\n  }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"Failed To Create New Message.\",\n        \"status\": 500,\n        \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/message.js",
    "groupTitle": "create",
    "name": "PostApiV1UsersCreateMessage"
  },
  {
    "group": "create",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/create/query",
    "title": "api for query creation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the query. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>status of the query. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of the query. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "recieverName",
            "description": "<p>reciever name . (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "recieverId",
            "description": "<p>reciever id . (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creatorName",
            "description": "<p>creator name . (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creatorId",
            "description": "<p>creator id . (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "image",
            "description": "<p>image of the query. (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Query has created Successfully\",\n    \"status\": 200,\n    \"data\": {}\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t    \"error\": true,\n\t    \"message\": \"Failed to create query\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/createQuery.js",
    "groupTitle": "create",
    "name": "PostApiV1UsersCreateQuery"
  },
  {
    "group": "create",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobile number of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Signup Successful\",\n    \"status\": 200,\n    \"data\": {}\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t    \"error\": true,\n\t    \"message\": \"Signup Failed\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userLoginRoute.js",
    "groupTitle": "create",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "delete",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/delete/query",
    "title": "api for delete a query",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>send authToken. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "queryId",
            "description": "<p>send query id. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"query has deleted!\",\n    \"status\": 200,\n    \"data\": {}\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t    \"error\": true,\n\t    \"message\": \"Failed To Delete Query\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/createQuery.js",
    "groupTitle": "delete",
    "name": "PostApiV1UsersDeleteQuery"
  },
  {
    "group": "delete",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/delete/query/from/watchlist",
    "title": "api for delete a query from watchlist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>send authToken. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>send user id. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Watchlist query has deleted!\",\n    \"status\": 200,\n    \"data\": {}  \n      \n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t    \"error\": true,\n\t    \"message\": \"Failed To delete watchlist query\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/createQuery.js",
    "groupTitle": "delete",
    "name": "PostApiV1UsersDeleteQueryFromWatchlist"
  },
  {
    "group": "delete",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "api to logout user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user in body parameter. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    {\n  \"error\": false,\n  \"message\": \"Logged Out Successfully\",\n  \"status\": 200,\n  \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t    \"error\": true,\n\t    \"message\": \"Logout Failed\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userLoginRoute.js",
    "groupTitle": "delete",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "read",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/get/all/notification",
    "title": "api to get all user notification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as a body parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>user id to get all notifications.(Send userId as a body parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    {\n  \"error\": false,\n  \"message\": \"All notification Found Successfully\",\n  \"status\": 200,\n  \"data\": [{\n      createdOn:2020-06-20T00:56:22.000+00:00\n      notificationId:\"7GpzIZ5jc\"\n      title:\"edited testing 6\"\n      message:\"edited\"\n      modifiedPersonName:\"abhishek\"\n      modifiedPersonId:\"Sw-vulMJ6\"\n      userWatchlistIds:Array\n  }]\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"Failed To Get All Notification.\",\n        \"status\": 500,\n        \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/notification.js",
    "groupTitle": "read",
    "name": "PostApiV1UsersGetAllNotification"
  },
  {
    "group": "read",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/get/all/query",
    "title": "api for get all query details",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>send authToken. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All Messages Found!\",\n    \"status\": 200,\n    \"data\":[{  \n       creatorId: \"Sw-vulMJ6\"\n       creatorName: \"abhishek\"\n       description: \"s<font face=\"Arial\">sdf</font>\"\n       image: \"http://localhost:3000/images/checksum_cn_3rd_unit.png\"\n       queryId: \"Q1qu_ngO3\"\n       recieverId: \"12345\"\n       recieverName: \"abhi\"\n       status: \"In-Progress\"\n       title: \"testing 1\"\n       userWatchlistIds: [\"Q1qu_ngO3\"]\n       createdOn: \"2020-06-17T06:18:13.000Z\"\n    }] \n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t    \"error\": true,\n\t    \"message\": \"Failed To Find All Message\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/createQuery.js",
    "groupTitle": "read",
    "name": "PostApiV1UsersGetAllQuery"
  },
  {
    "group": "read",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/get/all/user",
    "title": "api to get all users id",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as a body parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    {\n  \"error\": false,\n  \"message\": \"All users Id Found Successfully\",\n  \"status\": 200,\n  \"data\": [{\n    name:string,\n    userId:string\n  }]\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"Failed To Get All Users Id.\",\n        \"status\": 500,\n        \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userLoginRoute.js",
    "groupTitle": "read",
    "name": "PostApiV1UsersGetAllUser"
  },
  {
    "group": "read",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/get/all/watchlist/query",
    "title": "api for get all watchlist query for one user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>send authToken. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>send user id. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All Watchlist query Found!\",\n    \"status\": 200,\n    \"data\": [{  \n       creatorId: \"Sw-vulMJ6\"\n       creatorName: \"abhishek\"\n       description: \"s<font face=\"Arial\">sdf</font>\"\n       image: \"http://localhost:3000/images/checksum_cn_3rd_unit.png\"\n       queryId: \"Q1qu_ngO3\"\n       recieverId: \"12345\"\n       recieverName: \"abhi\"\n       status: \"In-Progress\"\n       title: \"testing 1\"\n       userWatchlistIds: [\"Q1qu_ngO3\"]\n       createdOn: \"2020-06-17T06:18:13.000Z\"\n    }]\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t    \"error\": true,\n\t    \"message\": \"Failed To Find All watchlist query\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/createQuery.js",
    "groupTitle": "read",
    "name": "PostApiV1UsersGetAllWatchlistQuery"
  },
  {
    "group": "read",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/get/one/query",
    "title": "api for get one query details",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>send authToken. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "queryId",
            "description": "<p>send query id. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All Messages Found!\",\n    \"status\": 200,\n    \"data\": {  \n       creatorId: \"Sw-vulMJ6\"\n       creatorName: \"abhishek\"\n       description: \"s<font face=\"Arial\">sdf</font>\"\n       image: \"http://localhost:3000/images/checksum_cn_3rd_unit.png\"\n       queryId: \"Q1qu_ngO3\"\n       recieverId: \"12345\"\n       recieverName: \"abhi\"\n       status: \"In-Progress\"\n       title: \"testing 1\"\n       userWatchlistIds: [\"Q1qu_ngO3\"]\n       createdOn: \"2020-06-17T06:18:13.000Z\"\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t    \"error\": true,\n\t    \"message\": \"Failed To Find All Message\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/createQuery.js",
    "groupTitle": "read",
    "name": "PostApiV1UsersGetOneQuery"
  },
  {
    "group": "read",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/get/ten/message",
    "title": "api to get ten message",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as a body parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "queryId",
            "description": "<p>query id to get all message.(Send userId as a body parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>to get next 10 message.(skip as a body parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    {\n  \"error\": false,\n  \"message\": \"Ten notification Found Successfully\",\n  \"status\": 200,\n  \"data\": [{\n      createdOn:2020-06-20T00:56:22.000+00:00\n      messageId:\"7GpzIZ5jc\"\n      queryId:\"7GpzIZpld\"\n      message:\"edited\"\n      senderName:\"abhishek\"\n      senderId:\"Sw-vulMJ6\"\n  }]\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"Failed To Get Ten Messages.\",\n        \"status\": 500,\n        \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/message.js",
    "groupTitle": "read",
    "name": "PostApiV1UsersGetTenMessage"
  },
  {
    "group": "read",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/get/ten/notification",
    "title": "api to get ten user notification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as a body parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>user id to get all notifications.(Send userId as a body parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>to get next 10 notifications.(Send skip as a body parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    {\n  \"error\": false,\n  \"message\": \"Ten notification Found Successfully\",\n  \"status\": 200,\n  \"data\": [{\n      createdOn:2020-06-20T00:56:22.000+00:00\n      notificationId:\"7GpzIZ5jc\"\n      title:\"edited testing 6\"\n      message:\"edited\"\n      modifiedPersonName:\"abhishek\"\n      modifiedPersonId:\"Sw-vulMJ6\"\n      userWatchlistIds:Array\n  }]\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": \"Failed To Get Ten Notification.\",\n        \"status\": 500,\n        \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/notification.js",
    "groupTitle": "read",
    "name": "PostApiV1UsersGetTenNotification"
  },
  {
    "group": "read",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api to login user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Login Successfully\",\n    \"status\": 200,\n    \"data\": {\n         userId:\"X1_ad7a\",\n         name:\"anmit\",\n         email:\"abc@gmail.com\",\n         mobileNumber:\"703301289\"\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t    \"error\": true,\n\t    \"message\": \"Login Failed\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/userLoginRoute.js",
    "groupTitle": "read",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "update",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/add/to/watchlist/query",
    "title": "api to add user in query watchlist.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "queryId",
            "description": "<p>queryId of the query. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User added Successfully in watchlist\",\n    \"status\": 200,\n    \"data\": {}\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t    \"error\": true,\n\t    \"message\": \"Failed to add user in query watchlist\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/createQuery.js",
    "groupTitle": "update",
    "name": "PostApiV1UsersAddToWatchlistQuery"
  },
  {
    "group": "update",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/edit/notification",
    "title": "api for edit notification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "notificationId",
            "description": "<p>notification Id. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>user Id. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Notification Edited Successful\",\n    \"status\": 200,\n    \"data\": {}\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t    \"error\": true,\n\t    \"message\": \"Notification Edition Failed\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/notification.js",
    "groupTitle": "update",
    "name": "PostApiV1UsersEditNotification"
  },
  {
    "group": "update",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/edit/query",
    "title": "api for edit query.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>title of the query. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>status of the query. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>description of the query. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "recieverName",
            "description": "<p>reciever name . (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "recieverId",
            "description": "<p>reciever id . (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "image",
            "description": "<p>image of the query. (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Query Edited Successful\",\n    \"status\": 200,\n    \"data\": {}\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n\t    \"error\": true,\n\t    \"message\": \"Failed to edit query\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/createQuery.js",
    "groupTitle": "update",
    "name": "PostApiV1UsersEditQuery"
  }
] });
