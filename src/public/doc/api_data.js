define({ "api": [
  {
    "type": "delete",
    "url": "/v1/users/:user_id",
    "title": "delete an user",
    "version": "0.0.1",
    "name": "deleteUsrById",
    "group": "users",
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
            "field": "_links",
            "description": "<p>hypermedia</p>"
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
            "field": "_links",
            "description": "<p>hypermedia</p>"
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
            "field": "_links",
            "description": "<p>hypermedia</p>"
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
            "field": "_links",
            "description": "<p>hypermedia</p>"
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
            "field": "_links",
            "description": "<p>hypermedia</p>"
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
            "field": "_links",
            "description": "<p>hypermedia</p>"
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
            "field": "_links",
            "description": "<p>hypermedia</p>"
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
            "field": "_links",
            "description": "<p>hypermedia</p>"
          }
        ]
      }
    },
    "filename": "src/routes/v1/users.js",
    "groupTitle": "users"
  }
] });