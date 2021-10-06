//Read list Implementation
import filter from '@cocreate/filter'
import crud from '@cocreate/crud-client';
import logic from '@cocreate/logic';
import render from '@cocreate/render';


const {fetch_collection, is_collection_fetch, fetch_count} = crud.getFetchAttr(el) //namespace, room, broadcast, broadcat_sender, 


var filters = CoCreateFilter.setFilter(
	el, 
	attrName, /* default value = template_id*/ 
	type, /* default value = template*/
)

/** filter object structure */
filter = {
	id, 			/* element id */
	el, 			/* element */
	type,			/* type in input parameter */
	collection, 	/* fetch-collection */
	is_collection,	/* fetch-value_type == collection ? true : false */
	startIndex, 	/* init value = 0 */
	search: {
		type: 'or',	/* or */
		value:[],	/* Array:filter-value without filter-name */
	}, 
	orders: [{
		name,		/* order-by */
		type,		/* order-type == 'asc' ? 1 : -1 */
	}],			
	filters: [{
		name,		/* filter-name */
		value:[],	/* filter-value by filter-value_type(string|raw|number) : Array */
		operator,	/* filter-operator */
		type		/* filter-type */
	}],
	count,			/* fetch-count */
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
	// let filter_name = f_el.getAttribute('filter-name');
	// let filter_operator = f_el.getAttribute('filter-operator') ? f_el.getAttribute('filter-operator') : '$contain';
	// let value_type = f_el.getAttribute('filter-value_type') ? f_el.getAttribute('filter-value_type') : 'string';
	// let filter_type = f_el.getAttribute('filter-type');
	// let filter_value = f_el.getAttribute('filter-value');
	// let value = this.getAttribute('toggle-order') || '';
