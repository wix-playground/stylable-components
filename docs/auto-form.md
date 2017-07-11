# Auto form

the auto form component is part of the auto-views component library, it creates a form visual representation from a schema

## properties

* schemaId: string
* schemaRepo: SchemaRepository
* data: optional - data instance that fits with the schema
* onChange: callback function for change, will be called on change with the following payload:
    * data: new data instance that fits with the schema
    * patch: 2nd stage: a JSON patch representing the change [http://jsonpatch.com/](http://jsonpatch.com/)


