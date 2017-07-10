# Auto-Views component family

## introduction

the auto-views component family includes components that genarate views from JSON schemas.

the json schemas are based on a subset of the json schema syntax [JSONschema.org](http://json-schema.org).

by using a common schema and different view-Generators we can create many different views from the same schema

## example

the json schema

```json
{
  "id": "/user",
  "type":"object",
  "title":"User",
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

![image](https://user-images.githubusercontent.com/2289769/27994043-55fb639e-64be-11e7-906f-be9703cdc6c1.png)

the following editing view:  
![image](https://user-images.githubusercontent.com/2289769/27994053-88ffa818-64be-11e7-8301-b9387e721eab.png)

the following table view:  
![image](https://user-images.githubusercontent.com/2289769/27994097-306a5b8e-64bf-11e7-8611-b50dcb275314.png)

and the following list views:  
![image](https://user-images.githubusercontent.com/2289769/27994085-ef35dd3c-64be-11e7-80b0-f4c91b1c1516.png)

## syntax

the schemas are defined in JSON format with the minimal schema  ```{}``` representing "any" type.

### meta-data

the following meta-data fields are supported:

* id: unique id of the schema in URI format
* title: readable title
* description: short description

because the schemas are used to create GUI, it is sometimes usefull to define extra schemas  for the same dataType (views), this should be used only for differnt views and not apply any different validation.

in these cases it is usefull to have the view schemas extend on base schema that defines the validation

* TBD: viewOf: unique id of base schema

### validation/typings

a schema can denote its acceptable type/types using the type keyword, available options: "string","number","boolean","null","array" or "object"

##### example

```JSON
{
  "id":"/product",
  "title":"Product",
  "type":"object"
}

```


each type adds its own validation keywords:

#### number validation keywords
* multipleOf : number
* maximum  : number
* exclusiveMaximum: boolean, defaults to false, does maximum N allow N?
* minimum : number
* exclusiveMinimum: boolean, defaults to false, does minimum N allow N?

#### string validation keywords
* maxLength : number
* minLength  : number
* pattern: regExp to match against value
* format : "email" / "URI" / "date-time"
* enum: array of string options to allow


#### object validation keywords
* properties : propertyName to schema object
* additionalProperties  : schema to match when property name does not match any defined property ( having only additionalProperties schema is describing a map)
* required: array of required props

```json
{
  "id":"person",
  "type":"object",
  "properties":{
    "lastName":{
      "type":"string"
    }
  }
}

// a named property called "lastName" with value of type string



{
  "id":"stringToNumberMap",
  "type":"object",
  "additionalProperties":{
      "type":"number"
  }
}

//string to number map example



```


#### array validation keywords
* items : schema of the child items
* maxItems  : number
* minItems  : number
* uniqueItems: booelan /* no duplicates allowed */


### ref - referncing schemas

a schema can reference another schema usinng the ref keyword


```json
{
  "id":"person",
  "type":"object",
  "properties":{
    "lastName":{
      "type":"string"
    }
  }
}


{
  "id":"task",
  "type":"object",
  "properties":{
    "owner":{
      "$ref":"person"
    }
  }
}

//the task schema refernces the person schema


```

### oneOf - union between complex types

a schema can be defined as a union between other schemas


```json
{
  "id":"image",
  "type":"object",
  "properties":{
    "src":{
      "type":"string"
    }
  }
}

{
  "id":"video",
  "type":"object",
  "properties":{
    "src":{
      "type":"string"
    }
  }
}



{
  "id":"post",
  "type":"object",
  "properties":{
    "media":{
      "$oneOf":[{"$ref":"image"},{"$ref":"video"}]
    }
  }
}

//the post schema refernces multiple schemas


```



### GUI Hints
the following meta-data fields have been added for better GUI generation:

* views: a map between view-names to visual components for the schema, each view can specifiy:
  * controller: unique id of component to show for this data
  * props: object containing extra props for said component

```json

{
  "id": "/MpImage",
  "title":"MpImage",
  "description":"Wix media platform image",
  "views":{
    "view":{
      "controller":"MpImageViewer",
      "props":{
        "cropMode":"Center"
      }

    }
  }
}

```
![image](https://user-images.githubusercontent.com/2289769/27993957-dcbdfd90-64bb-11e7-9d46-01c76518d5f4.png)

* semanticHints: an object containing semantic hints for better GUI generation:
  * role: string, properties with the same role will be grouped together, some view generators support presentations for specific roles ( and default to role content when not specified)

```json

{
  "title":"User",
  "type":"object",
  "properties":{
    "fName":{
      "semanticHints":{
        "role":"name"
      },
      "type":"string"
    },
    "lName":{
      "semanticHints":{
        "role":"name"
      },
      "type":"string"
    },
    "age":{
      "type":"number"
    }
  }
}


```
![image](https://user-images.githubusercontent.com/2289769/27994104-48742f20-64bf-11e7-8b34-87380415571c.png)





## exports

* schema-repo
* form-generator
* detail-view-generator
* thumbnail-generator
* thumbnail-list-form-generator
* list-form-generator
* grid-view-generator
* table-edit-generator
