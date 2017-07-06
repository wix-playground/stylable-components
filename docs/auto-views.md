### Auto-Views component family

## introduction

the auto-views component family includes components that genarate views from JSON schemas.

the json schemas follow the json schema syntax [JSONschema.org](http://json-schema.org).

by using a common schema and different view-Generators we can create many different views from the same schema

## example

the json schema

```json
{
  "type":"object",
  "title":"reposi",
  "properties":{
    "fName":{
      "type":"string",
      "title":"First name"
    },
    "lName":{
      "type":"string",
      "title":"Last name"
    },
    "age":{
      "type":"number",
      "title":"Age"
    }
  }
}

```
can be generated into:

the following view:

* enter view here *

the following editing view:

* enter view here *

and the following list views:

* enter view here *

## exports

* schema-repo 
* form-generator 
* detail-view-generator
* thumbnail-generator
* thumbnail-list-form-generator
* list-form-generator
* grid-view-generator
* table-edit-generator







