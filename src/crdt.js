//CRDT Implementatiom
import crdt from "@cocreate/crdt"
import crud from "@cocreate/crud-client"
import util from "@cocreate/utils"

// CRDT Implementaion
const {collection, document_id, name} = crud.GetAttr()

crdt.init({ collection, document_id, name, element/* DOM element */ })
crdt.getText({ collection, document_id, name })
crdt.insertText({ collection, document_id, name, value, position })
crdt.deleteText({ collection, document_id, name, position, length })
crdt.replaceText({ collection, document_id, name, value })

//. crdt listen and binding
/**
 * event: {
 *	detail: [{
 *		retain, //. position for insert and delete case
 *		insert, //. insert string
 *		delete, //. delete length
	}]
 * }
 * 
 * ex:	{insert: "testing", retain: 8}
 *			{delete: 10, reatin: 7}
 */

// example of binding the input to sync with crdt and maintain cursour positions
input_element.addEventListener('cocreate-crdt-update', function(event) {
  var info = event.detail;

  var pos = 0;
  var flag = true;

  info.forEach(item => {
    if (item.retain) {
      flag = true;
      pos = item.retain;
    }
    
    if (item.insert || item.delete) {
      if (flag == false) pos = 0;
      flag = false;
      if (item.insert) {
        //. element's insert process 
        // self.updateChangeData(this, item.insert, pos, pos)
      } else if (item.delete) {
        //. element's delete process
        // self.updateChangeData(this, "", pos, pos + item.delete);
      }
    }
  })
})
