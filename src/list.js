//Read list Implementation
import filter from '@cocreate/filter'
import crud from '@cocreate/crud-client';
import logic from '@cocreate/logic';
import render from '@cocreate/render';


const {fetch_collection, is_collection_fetch, fetch_count} = crud.GetFetchAttr(el) //namespace, room, broadcast, broadcat_sender, 


var filters = CoCreateFilter.setFilter(
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
