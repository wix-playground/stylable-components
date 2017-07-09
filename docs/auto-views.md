# Auto-Views component family

## introduction

the auto-views component family includes components that genarate views from JSON schemas.

the json schemas are a subset of the json schema syntax [JSONschema.org](http://json-schema.org).

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

![image](https://user-images.githubusercontent.com/2289769/27993856-32b4b8da-64ba-11e7-88a0-0c65b726a29b.png)


the following editing view:

![image](https://user-images.githubusercontent.com/2289769/27993859-3b25beba-64ba-11e7-8552-1ba0368a03ff.png)

the following table view

![image](https://user-images.githubusercontent.com/2289769/27993938-67e6fe68-64bb-11e7-8994-ce1b6cdba580.png)


and the following list views:

![image](https://user-images.githubusercontent.com/2289769/27993888-b9738144-64ba-11e7-9e36-d711fa03b2dc.png)


## syntax

the schemas are defined in JSON format with the minimal schema  ```{}``` representing "any type"

### meta-data

the following meta-data fields are supported:

* id: unique id of the schema in URI format
* title: readable title
* description: short description

because the schemas are used to create GUI, it is sometimes usefull to define extra schemas for the same dataType, this should be used only for differnt views and not apply any different validation.

in these cases it is usefull to have the view schemas extend on base schema that defines the validation

* extend: unique id of base schema

### validation/typings

a schema can denote its acceptable type/types using the type keywork, available options: "string","number","boolean","null","array" or "object"

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
* format : email / URI / date-time
* enum: array of options to allow


#### object validation keywords
* properties : propertyName to schema obejct
* additionalProperties  : schema to match when property name does not match any defined property ( having only additionalProperties schema is describing a map)
* required: array of required props


#### array validation keywords
* items : schema to match with items
* maxItems  : number
* minItems  : number
* uniqueItems: booelan


### GUI Hints
the following meta-data fields have been added for better GUI generation:

* views: an object defining a view component for different views data belonging to the schema, each view can specifiy:
  * controller: unique id of component to show for this data
  * props: object containing extra props for said component

```tsx

{
  title:"MpImage"
  description:"Wix media platform image"
  views:{
    "view":{
      controller:"MpImageViewer",
      props:{
        cropMode:"Center"
      }

    }
  }
}

```
![image](https://user-images.githubusercontent.com/2289769/27993957-dcbdfd90-64bb-11e7-9d46-01c76518d5f4.png)

* layoutHints: an object defining layout hints for better layouting of the resuls available hints:
  * break: boolean, defaults to false, after which field to add a lineBreak
  * modal: boolean, show GUI of content in modal

```tsx

{
  title:"User",
  type:"object",
  properties:{
    "fName":{
      type:"string"
    },
    "lName":{
      type:"string",
      layoutHints:{
        break:true;
      }
    },
    "age":{
      type:"number"
    }
  }
}


```
![image](https://user-images.githubusercontent.com/2289769/27993975-3ad8510a-64bc-11e7-9478-52e09d9c5cdf.png)




## exports

* schema-repo
* form-generator
* detail-view-generator
* thumbnail-generator
* thumbnail-list-form-generator
* list-form-generator
* grid-view-generator
* table-edit-generator
