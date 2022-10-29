// Crud implementation
import crud from "@cocreate/crud-client"


crud.listen('createDocument', function(data) { doSomething })
crud.listen('updateDocument', function(data) { doSomething })
crud.listen('deleteDocument', function(data) { doSomething })

// CRUD Implementation
const el = document.querySelector('xxx') // el is dom element  
const {collection, document_id, name, isRealtime, isRead, isSave, isListen} = crud.GetAttr(el) //namespace, room, broadcast, broadcat_sender

var c = await crud.createDocument({collection, document: {name:value}}) // {namespace, room, broadcast, broadcat_sender, ...}
var r = await crud.readDocument({collection, document: {_id, name}}) // {filter, async, event,  ...}
var u = await crud.updateDocument({collection, document: {_id, name: value}}) // {namespace, room, broadcast, broadcat_sender, filter, async, event, delete_fields ...}
var d = await crud.deleteDocument({collection, document: {_id},}) // {namespace, room, broadcast, broadcat_sender, async, filter, ...}
// {filter: {query, sort, search, startIndex}, async, ...}