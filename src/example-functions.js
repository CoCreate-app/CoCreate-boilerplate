// Socket implementation


import crud from "@cocreate/crud-client"
import util from "@cocreate/utils"


// crud.init()??
// crud.connect()??
crud.listen()
let async = await crud.listenAsync(event)

// CRUD Implementation
const el = document.querySelector('xxx') // el is dom element  
const {collection, document_id, name} = crud.GetAttr(el) //namespace, room, broadcast, broadcat_sender
const {is_realtime, is_read, is_save, is_update} = crud.getFlagAttr(el)
const is_crdt = crud.isCrdt(el) // used by crud only to dertimine if crdt exists... 

crud.createDocument({collection, uid: "unique string"}) // {namespace, room, broadcast, broadcat_sender, ...}
crud.readDocument({collection, document_id, name, element: "unique string"}) // {async, event,  ...}
crud.updateDocument({collection, document_id, name, element: "unique string"}) // {namespace, room, broadcast, broadcat_sender, async, event, delete_fields ...}
crud.deleteDocument({collection, document_id, element: "unique string"}) // {namespace, room, broadcast, broadcat_sender, async, event, ...}
crud.readDocumentList({collection, element: "unique string"}) //  {operator: {fetch, filter, order, search, startIndex}, is_collection, async, event, ...}

// CRDT Implementaion
const {collection, document_id, name} = crud.GetAttr()
//. init crdt
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
 *		{delete: 10, reatin: 7}
 */
 
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



// Filter Implementation


const {fetch_collection, is_collection_fetch, fetch_count} = crud.GetFetchAttr(el) //namespace, room, broadcast, broadcat_sender, 



var filter = CoCreateFilter.setFilter(
	el, 
	attrName, /* default value = data-template_id*/ 
	type, /* default value = template*/
)

/** filter object structure */
filter = {
	id, 			/* element id */
	el, 			/* element */
	type,			/* type in input parameter */
	collection, 	/* data-fetch_collection */
	is_collection,	/* data-fetch_value_type == collection ? true : false */
	startIndex, 	/* init value = 0 */
	search: {
		type: 'or',	/* or */
		value:[],	/* Array:data-filter_value without data-filter_name */
	}, 
	orders: [{
		name,		/* data-order_by */
		type,		/* data-order_type == 'asc' ? 1 : -1 */
	}],			
	filters: [{
		name,		/* data-filter_name */
		value:[],	/* data-filter_value by data-filter_value_type(string|raw|number) : Array */
		operator,	/* data-filter_operator */
		type		/* data-filter_type */
	}],
	count,			/* data-fetch_count */
}

crud.readDocumentList({
	"collection": filter.collection,
	"element": uuid,
	"metadata": {
		isRefresh: filter.isRefresh
	},
	"operator" :  {
		"filters": filter.filters,
		"orders": filter.orders,
		"search": filter.search,
		"startIndex": filter.startIndex,
		"count": filter.count
	},
	"is_collection": filter.is_collection
});





	// let f_el = filter_objs[i];
	// let filter_name = f_el.getAttribute('data-filter_name');
	// let filter_operator = f_el.getAttribute('data-filter_operator') ? f_el.getAttribute('data-filter_operator') : '$contain';
	// let value_type = f_el.getAttribute('data-filter_value_type') ? f_el.getAttribute('data-filter_value_type') : 'string';
	// let filter_type = f_el.getAttribute('data-filter_type');
	// let filter_value = f_el.getAttribute('data-filter_value');
	// let value = this.getAttribute('data-toggle_order') || '';
