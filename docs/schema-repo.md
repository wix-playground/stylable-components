# Schema repo

the schema repo stores JSON Schema's for use in auto-view generation.

it allows registering schemas, retrieving them.
registering named custom views (components) and retriving them
it can be used to create your own auto-view generators.


## API

* constructor:
```ts
SchemaRepo(parentRepo?:SchemaRepo);
```
params:
* parentRepo: schemaRepo to inherit definitions from

* addDefinition:

adds a schema definition to repo
```ts
myRepo.addDefinition(def:JSONSchema)
```


* addDefinitions:

adds a schema definition to repo
```ts
addDefinitions(defs:JSONSchema[])
```

* getDefinition:

returns a JSON schema if exists

```ts
myRepo.getDefinition(id:string):JSONSchema | null
```


* getView:

returns a view from a JSON schema if both exists

```ts
myRepo.getView(schemaId:string,viewName:string):AutoViewsViewSchema | null
```


* registerController:

registers a controller to a unique name

```ts
myRepo.registerController<D>(controllerId:string,controller:React.ComponentClass):void
```

* getController:

gets a controller according to a unique name, returns null if not found

```ts
myRepo.getController<D>(controllerId:string):React.ComponentClass | null
```


