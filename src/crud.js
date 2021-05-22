// Crud implementation
import crud from "@cocreate/crud-client"


crud.listen('createDocument', function(data) { doSomething })
crud.listen('updateDocument', function(data) { doSomething })
crud.listen('deleteDocument', function(data) { doSomething })

// CRUD Implementation
const el = document.querySelector('xxx') // el is dom element  
const {collection, document_id, name} = crud.GetAttr(el) //namespace, room, broadcast, broadcat_sender
const {is_realtime, is_read, is_save, is_update} = crud.getFlagAttr(el)
const is_crdt = crud.isCrdt(el) // used by crud only to dertimine if crdt exists... 

crud.createDocument({collection, uid: "unique string"}) // {namespace, room, broadcast, broadcat_sender, ...}

crud.readDocument({collection, document_id, name, element: "unique string"}) // {async, event,  ...}
let async = await crud.listenAsync(event)

crud.updateDocument({collection, document_id, name, element: "unique string"}) // {namespace, room, broadcast, broadcat_sender, async, event, delete_fields ...}
crud.deleteDocument({collection, document_id, element: "unique string"}) // {namespace, room, broadcast, broadcat_sender, async, event, ...}
crud.readDocumentList({collection, element: "unique string"}) // {operator: {fetch, filter, order, search, startIndex}, is_collection, async, event, ...}
