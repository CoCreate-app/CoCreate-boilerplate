// Crud implementation
import crud from "@cocreate/crud-client"


crud.listen('createDocument', function(data) { doSomething })
crud.listen('updateDocument', function(data) { doSomething })
crud.listen('deleteDocument', function(data) { doSomething })

// CRUD Implementation
const el = document.querySelector('xxx') // el is dom element  
const {collection, document_id, name, is_realtime, is_read, is_save, is_listen} = crud.GetAttr(el) //namespace, room, broadcast, broadcat_sender
const is_crdt = crud.isCrdt(el) // used by crud only to dertimine if crdt exists... 

var c = await crud.createDocument({collection, uid: "unique string"}) // {namespace, room, broadcast, broadcat_sender, ...}
var r = await crud.readDocument({collection, document_id, name, element: "unique string"}) // {async, event,  ...}
var u = await crud.updateDocument({collection, document_id, name, element: "unique string"}) // {namespace, room, broadcast, broadcat_sender, async, event, delete_fields ...}
var d = await crud.deleteDocument({collection, document_id, element: "unique string"}) // {namespace, room, broadcast, broadcat_sender, async, event, ...}
var s = await crud.readDocumentList({collection, element: "unique string"}) // {operator: {fetch, filter, order, search, startIndex}, is_collection, async, event, ...}