define({ "api": [
  {
    "type": "post",
    "url": "/v1/auth/login",
    "title": "log in as an user",
    "version": "0.0.1",
    "name": "login",
    "group": "auth",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>login object to be created</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body.usrnm",
            "description": "<p>users username or email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body.passwd",
            "description": "<p>users password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>created user object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>hypermedia</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/auth.js",
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/v1/auth/signin",
    "title": "sign in and create an user",
    "version": "0.0.1",
    "name": "signin",
    "group": "auth",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>user object to be created</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body.usrnm",
            "description": "<p>users username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body.passwd",
            "description": "<p>users password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body.email",
            "description": "<p>users email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body.name",
            "description": "<p>users name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>created user object</p>"
          },
          {
            "group": "Success 201",
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>hypermedia</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/auth.js",
    "groupTitle": "auth"
  },
  {
    "type": "delete",
    "url": "/v1/users/:user_id/follows/:follow_id",
    "title": "delete a follow relation",
    "version": "0.0.1",
    "name": "deleteFlwById",
    "group": "follows",
    "permission": [
      {
        "name": "user has to have a token"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "optional": false,
            "field": "user_id",
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "optional": false,
            "field": "follow_id",
            "description": "<p>follow relation unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>array of user objects</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/follows.js",
    "groupTitle": "follows"
  },
  {
    "type": "get",
    "url": "/v1/users/:user_id/follows/:follow_id",
    "title": "rertieve a follow reltion",
    "version": "0.0.1",
    "name": "findFlwById",
    "group": "follows",
    "permission": [
      {
        "name": "user has to have a token"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "optional": false,
            "field": "user_id",
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "optional": false,
            "field": "follow_id",
            "description": "<p>follow relation unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>follow object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/follows.js",
    "groupTitle": "follows"
  },
  {
    "type": "get",
    "url": "/v1/users/:user_id/follows",
    "title": "list who user follows",
    "version": "0.0.1",
    "name": "findFlws",
    "group": "follows",
    "permission": [
      {
        "name": "user has to have a token"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "optional": false,
            "field": "user_id",
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>number of page</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>array of follow objects</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/follows.js",
    "groupTitle": "follows"
  },
  {
    "type": "get",
    "url": "/v1/users/:user_id/follows/me",
    "title": "list who follows user",
    "version": "0.0.1",
    "name": "findFlwsMe",
    "group": "follows",
    "permission": [
      {
        "name": "user has to have a token"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "optional": false,
            "field": "user_id",
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>number of page</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>array of follow objects</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/follows.js",
    "groupTitle": "follows"
  },
  {
    "type": "options",
    "url": "/v1/users/:user_id/follows/:follow_id",
    "title": "specific follow options",
    "version": "0.0.1",
    "name": "followOptions",
    "group": "follows",
    "permission": [
      {
        "name": "user has to have a token"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "optional": false,
            "field": "user_id",
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "optional": false,
            "field": "follow_id",
            "description": "<p>follow relation unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/follows.js",
    "groupTitle": "follows"
  },
  {
    "type": "get",
    "url": "/v1/users/:user_id/follows",
    "title": "follow options",
    "version": "0.0.1",
    "name": "followsOptions",
    "group": "follows",
    "permission": [
      {
        "name": "user has to have a token"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "optional": false,
            "field": "user_id",
            "description": "<p>users unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/follows.js",
    "groupTitle": "follows"
  },
  {
    "type": "post",
    "url": "/v1/users/:user_id/follows",
    "title": "create a follow relation",
    "version": "0.0.1",
    "name": "insertFlw",
    "group": "follows",
    "permission": [
      {
        "name": "user has to have a token"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "optional": false,
            "field": "user_id",
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>request body</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectID",
            "optional": false,
            "field": "body.user_id",
            "description": "<p>users unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>follow object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/follows.js",
    "groupTitle": "follows"
  },
  {
    "type": "delete",
    "url": "/v1/users/:user_id",
    "title": "delete an user",
    "version": "0.0.1",
    "name": "deleteUsrById",
    "group": "users",
    "permission": [
      {
        "name": "user has to have a token"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "optional": false,
            "field": "user_id",
            "description": "<p>users unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "type": "Undefined",
            "optional": false,
            "field": "data",
            "description": "<p>no content</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/users.js",
    "groupTitle": "users"
  },
  {
    "type": "get",
    "url": "/v1/users/:user_id",
    "title": "request user information",
    "version": "0.0.1",
    "name": "findUsrById",
    "group": "users",
    "permission": [
      {
        "name": "user has to have a token"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "optional": false,
            "field": "user_id",
            "description": "<p>users unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>user object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/users.js",
    "groupTitle": "users"
  },
  {
    "type": "get",
    "url": "/v1/users",
    "title": "list users",
    "version": "0.0.1",
    "name": "findUsrs",
    "group": "users",
    "permission": [
      {
        "name": "user has to have a token"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>number of page</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order",
            "description": "<p>user parameter to do order with</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "usrnm",
            "description": "<p>users username to search for</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>users email to search for</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>users name to search for</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lang",
            "description": "<p>users languague to search for</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>users country to search for</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>array of user objects</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/users.js",
    "groupTitle": "users"
  },
  {
    "type": "post",
    "url": "/v1/users",
    "title": "create an user",
    "version": "0.0.1",
    "name": "insertUsr",
    "group": "users",
    "permission": [
      {
        "name": "user has to have a token"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>user object to be created</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body.usrnm",
            "description": "<p>users username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body.passwd",
            "description": "<p>users password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body.email",
            "description": "<p>users email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body.name",
            "description": "<p>users name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>created user object</p>"
          },
          {
            "group": "Success 201",
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>hypermedia</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/users.js",
    "groupTitle": "users"
  },
  {
    "type": "patch",
    "url": "/v1/users/:user_id",
    "title": "partially update an user",
    "version": "0.0.1",
    "name": "patchUsr",
    "group": "users",
    "permission": [
      {
        "name": "user has to have a token"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "optional": false,
            "field": "user_id",
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>user object to be updated</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>user object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/users.js",
    "groupTitle": "users"
  },
  {
    "type": "put",
    "url": "/v1/users/:user_id",
    "title": "update an user",
    "version": "0.0.1",
    "name": "updateUsr",
    "group": "users",
    "permission": [
      {
        "name": "user has to have a token"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "optional": false,
            "field": "user_id",
            "description": "<p>users unique id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "body",
            "description": "<p>user object to be updated</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>user object</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/users.js",
    "groupTitle": "users"
  },
  {
    "type": "options",
    "url": "/v1/users/:user_id",
    "title": "specific user options",
    "version": "0.0.1",
    "name": "userOptions",
    "group": "users",
    "permission": [
      {
        "name": "user has to have a token"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectID",
            "optional": false,
            "field": "user_id",
            "description": "<p>users unique id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/users.js",
    "groupTitle": "users"
  },
  {
    "type": "options",
    "url": "/v1/users",
    "title": "user options",
    "version": "0.0.1",
    "name": "usersOptions",
    "group": "users",
    "permission": [
      {
        "name": "user has to have a token"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>indicates done action</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "links",
            "description": "<p>hypermedia</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "auth",
            "description": "<p>authorization token</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/users.js",
    "groupTitle": "users"
  }
] });
