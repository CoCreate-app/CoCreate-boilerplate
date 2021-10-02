//CRDT Implementatiom
import crdt from "@cocreate/crdt"
import crud from "@cocreate/crud-client"

// CRDT Implementaion
const {collection, document_id, name} = crud.GetAttr()

crdt.init({ collection, document_id, name, element/* DOM element */ })
crdt.getText({ collection, document_id, name })
crdt.insertText({ collection, document_id, name, value, position })
crdt.deleteText({ collection, document_id, name, position, length })
crdt.replaceText({ collection, document_id, name, value })

//. crdt change event
/**
 *  event: {
 *    detail: [{
 *      collection: '',
 *      document_id '',
 *      name: '',
 *      retain, //. position for insert and delete case
 *		  insert, //. insert string
 *		  delete, //. delete length
 *    }]
 * }
 * 
 * ex:	{insert: "testing", retain: 8}
 *			{delete: 10, reatin: 7}
 */

element.addEventListener('cocreate-crdt-update', function(event) {
  var info = event.detail; // details conatain collection document_id and name... use this to find your element
})
