// Crud implementation
import crud from "@cocreate/crud-client"


crud.listen('createDocument', function(data) { doSomething })
crud.listen('updateDocument', function(data) { doSomething })
crud.listen('deleteDocument', function(data) { doSomething })

// CRUD Implementation
const el = document.querySelector('xxx') // el is dom element  
const {collection, document_id, name, isRealtime, isRead, isSave, isListen} = crud.GetAttr(el) //namespace, room, broadcast, broadcat_sender

var c = await crud.createDocument({collection, data: {name:value}}) // {namespace, room, broadcast, broadcat_sender, ...}
var r = await crud.readDocument({collection, document_id, name}) // {async, event,  ...}
var u = await crud.updateDocument({collection, document_id, data: {name:value}}) // {namespace, room, broadcast, broadcat_sender, async, event, delete_fields ...}
var d = await crud.deleteDocument({collection, document_id}) // {namespace, room, broadcast, broadcat_sender, async, event, ...}
var s = await crud.readDocumentList({collection}) // {operator: {fetch, filter, order, search, startIndex}, is_collection, async, event, ...}