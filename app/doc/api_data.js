define({ "api": [  {    "type": "get",    "url": "v1/users/user/:id",    "title": "查询用户信息",    "version": "1.0.0",    "name": "______",    "group": "User",    "permission": [      {        "name": "none"      }    ],    "description": "<p>Compare Verison 1.0.0</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>用户ID</p>"          }        ]      }    },    "examples": [      {        "title": "Example usage:",        "content": "curl -i http://localhost/user/4711",        "type": "json"      }    ],    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>用户ID</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "registered",            "description": "<p>注册时间</p>"          },          {            "group": "Success 200",            "type": "Date",            "optional": false,            "field": "name",            "description": "<p>用户名称</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "profile",            "description": "<p>用户简介</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "profile.age",            "description": "<p>年龄</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "profile.image",            "description": "<p>头像地址</p>"          },          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "options",            "description": "<p>空</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "options.name",            "description": "<p>Option Name.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "options.value",            "description": "<p>Option Value.</p>"          }        ]      }    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "NoAccessRight",            "description": "<p>没有认证登录</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "UserNotFound",            "description": "<p>该用户不存在</p>"          }        ]      },      "examples": [        {          "title": "Response (example):",          "content": "HTTP/1.1 401 Not Authenticated\n{\n  \"error\": \"NoAccessRight\"\n}",          "type": "json"        }      ]    },    "filename": "app/controller/home.js",    "groupTitle": "User",    "sampleRequest": [      {        "url": "http://api.yannis.xinv1/users/user/:id"      }    ]  }] });
