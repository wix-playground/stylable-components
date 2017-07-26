**THIS DOCUMENT IS WORK IN PROGRESS - NOTHING FINAL**

# Data Grid Component

DataGrid display lists of complex data as a grid with editing capabilities, custom renderers, keyboard navigation, optimized infinite rendering...

* [Properties](#properties)
* [style](#style)
* [handling input](#Handling-Input)

## Properties

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| columns | `string[]` | - | YES | column list filter and order to display |
| data | `object[] | GridDataProvider` | - | YES | list of data to display or data provider for dynamic lists |
| rowsAmount | `number` | null | NO | number of data items hint for better position indication of dynamic data (scroll / pagination?) |
| rowHeight | `number` | 25 | NO | height of row in pixels |
| initRows | `number` | 10 | NO | amount of rows to render before measuring is possible (first render & server render) |
| initCols | `number | "all"` | all | NO | amount of cols to render before measuring is possible (first render & server render) |
| columnConfig | `ColumnConfig` | default ColumnConfig | NO | default column configuration |
| customColumnConfig | `{[id:string]:ColumnConfig}` | null | NO | optional configuration for each column |
| onEditStart | `(e:EditStateEvent) => void` | null | NO | callback when cell edit start |
| onColumnConfigChange | `(e:EditStateEvent) => void` | null | NO | callback when cell edit start |


### Additional types

#### GridDataProvider: `(indexStart:number, indexEnd:number) => Thenable<object[]>`
Use for large amounts of data that is loaded on demand.

#### ColumnConfig:

| Name | Type | Default | Required | Description |
| -- | -- | -- | -- | -- |
| width | `number` | 100 | NO | width of column |
| resizable | `boolean` | false | NO | enable column resizing |
| sortable | `boolean` | false | NO | render sort control |
| sortControlOptions | `any` | - | NO | properties for sort control |
| editable | `boolean"` | false | NO | enable cell editing  |

#### EditStartEvent:

| Name | Type | Description |
| -- | -- | -- |
| column | `string` | id of column |
| data | `any` | edited line data |
| preventDefault | `() => void` | prevent editing |

## Style

### Pseudo elements

| Name | Type | pseudo classes | Description |
| -- | -- | -- | -- |
| `::line` | `li` | `:first :last :index(n)` | line in grid |
| `::cell` | `span` | `:first :last :name(columnID)` | cell in line |
| `::header` | `div` | - | header container |
| `::column-header` | `span` | `:first :last :name(columnID)` | column header cell |

## Handling-Input

### Keyboard Navigation

## Stages of development

* Grid with infinite rows
    * data consume API
    * smooth/jumpy scroll according to rowsAmount hint
    * columns default width
* Configurable columns
    * width
    * sort
* Keyboard navigation
* Editing
* Custom renderer
    * cell renderer
    * sort / filter renderer
* Configurable anchored rows / columns


TBD:

controlled / uncontrolled:
 * sort
 * position
